import multer from "multer";
import path from "path";
import { getRandomString as getRSTR } from "../util/functions";

const upload = multer({
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype;
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowedFileTypes.includes(fileType))
      return cb(new Error("Only images and zip are allowed"));

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, process.cwd() + "/public/uploads/");
    },
    filename: (req, file, cb) => {
      let newFileName
      if (req.url === '/api/uploads/profile_img') {
        newFileName = `profile-${Date.now()}-${getRSTR(10)}${path.extname(file.originalname)}`;
        (req as any).uploadedFileName = newFileName
        return cb(null, newFileName);
      } else {
        newFileName = `post-${Date.now()}-${getRSTR(10)}${path.extname(file.originalname)}`;
        (req as any).uploadedFileName = newFileName
        return cb(null, newFileName);
      }   
    },
  }),
});

const uploadMiddleware = upload.array("z-file");

export default uploadMiddleware;
