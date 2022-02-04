import fs from 'fs'
import path from 'path'
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

// Error handleling
const apiRoute = nextConnect({
    onError(error: any, req: NextApiRequest, res: NextApiResponse) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  
  
  apiRoute.get(({query: {fileName}}, res) => {
    const defaultNoImgPath = path.resolve('.', 'public/noImage.jpg')
    const filePath = path.resolve('.', `public/uploads/${fileName}`)
    
    // Check if exist a file and if is'nt send the default img
    if (!fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'image/jpg')
        return res.send(fs.readFileSync(defaultNoImgPath))
    }
    res.setHeader('Content-Type', 'image/jpg')
    return res.send(fs.readFileSync(filePath))
  });
  
  export default apiRoute;