// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const params = req.body;

      console.log(params);
      // if (!Array.isArray(params)) {
      //   return res.status(422).json({ message: "Invalid body" });
      // }

      res.status(200).json(params);
      // const data = await Promise.all();
      //   res.status(200).json(response);
    } else {
      return res.status(400).json({ message: "Bad Request" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
