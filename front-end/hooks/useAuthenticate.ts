import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { User } from ".";
import { useNotification } from "../contexts/Notification";

const useAuthenticate = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
    onError: (error) => {
      openNotification({
        type: "error",
        message: error.name,
        description: error.message,
      });
    },
  });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage({
    onError: (error) => {
      openNotification({
        type: "error",
        message: error.name,
        description: error.message,
      });
    },
  });
  const { data } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { openNotification } = useNotification();

  const authenticate = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    try {
      setIsAuthenticating(true);
      const { account, chain } = await connectAsync();
      // console.log(provider);
      const challenge = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      });

      if (!challenge) {
        openNotification({
          type: "error",
          message: "No Challenge Received",
          description: "Please Re-login",
        });
        throw new Error("No challenge received");
      }
      const signature = await signMessageAsync({ message: challenge.message });
      await signIn("moralis-auth", {
        message: challenge.message,
        signature,
        network: "Evm",
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    await disconnectAsync();
    await signOut({ redirect: false });
    setIsLoggingOut(false);
  };

  const isAuthenticated = data?.user ? true : false;

  const user = isAuthenticated ? (data?.user as User) : undefined;

  return {
    authenticate,
    logout,
    isAuthenticated,
    user,
    isAuthenticating,
    isLoggingOut,
  };
};

export default useAuthenticate;
