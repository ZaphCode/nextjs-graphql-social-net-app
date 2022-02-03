import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/config";

const authUserMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  
  const token = req.cookies.JWT;
  if (token) {
    try {
      const decode: any = jwt.verify(token.split(" ")[1], JWT_SECRET);
      (req as any).verifiedUser = decode.user
      next()
    } catch (error) {
      throw new Error("Decoding jtw error") ;
    }
  } else {
    throw new Error("No token found") ;
  }
};

export default authUserMiddleware
