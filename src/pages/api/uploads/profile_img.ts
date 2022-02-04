import nextConnect from "next-connect";
import { prisma } from "../../../lib/prisma_client";
import { NextApiRequest, NextApiResponse } from "next";
import uploadMiddleware from "../../../middlewares/uploadMiddleware";
import authUserMiddleware from "../../../middlewares/authUserMiddleware";
import fs from "fs";
import path from "path";

// * Next config
export const config = { api: { bodyParser: false } };

//? Error handlers
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

//? Middlewares
apiRoute.use(authUserMiddleware);
apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {

  const user = await prisma.user.findUnique({
    where: {
      id: (req as any).verifiedUser.id,
    },
  });

  const oldFilePath = path.resolve(".", `public/uploads/${user?.profileImg}`);
  const newFileName = (req as any).uploadedFileName;

  // This removes the old file in the folder
  if (fs.existsSync(oldFilePath)) { 
    fs.unlinkSync(oldFilePath);
  }

  // Updating the user's profile image (string)
  const userUpdated = await prisma.user.update({
    where: {
      id: (req as any).verifiedUser.id,
    },
    data: {
      profileImg: newFileName,
    },
  });

  res
    .status(200)
    .json({
      message: `Success. image Uploaded`,
      imageName: userUpdated.profileImg
    });
});

export default apiRoute;
