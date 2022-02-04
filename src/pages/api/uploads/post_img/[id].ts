import nextConnect from "next-connect";
import { prisma } from "../../../../lib/prisma_client";
import { NextApiRequest, NextApiResponse } from "next";
import uploadMiddleware from "../../../../middlewares/uploadMiddleware";
import authUserMiddleware from "../../../../middlewares/authUserMiddleware";
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
  const newFileName = (req as any).uploadedFileName;

  const post = await prisma.post.findUnique({
    where: { id: req.query.id as string },
    include: { author: true },
  });

  //* Validations

  if (!post) {
    fs.unlinkSync(path.resolve(".", `public/uploads/${newFileName}`));
    throw new Error("Post not found");
  }

  if (post.authorId !== (req as any).verifiedUser.id) {
    fs.unlinkSync(path.resolve(".", `public/uploads/${newFileName}`));
    throw new Error("Unauthorized");
  }

  if (post.postImg) {
    const oldFilePath = path.resolve(".", `public/uploads/${post.postImg}`);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  //* Updating post
  
  const postUpdated = await prisma.post.update({
    where: { id: req.query.id as string },
    data: {
      postImg: newFileName,
    },
  });

  return res.status(200).json({
    message: `Success. image Uploaded`,
    imageName: postUpdated.postImg,
  });
});

export default apiRoute;
