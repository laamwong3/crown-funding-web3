import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { User } from ".";

const useAuthenticate = () => {
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const authenticate = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    try {
      const { account, chain } = await connectAsync();
      // console.log(provider);
      const challenge = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      });

      if (!challenge) {
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
    }
  };

  const logout = async () => {
    await disconnectAsync();
    await signOut({ redirect: false });
  };

  const isAuthenticated = data?.user ? true : false;

  const user = isAuthenticated ? (data?.user as User) : undefined;

  return { authenticate, logout, isAuthenticated, user };
};

export default useAuthenticate;
