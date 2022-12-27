// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
      }
      const abi = req.body;

      const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

      res.status(200).json(response);
    } else {
      throw "Bad Request";
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
