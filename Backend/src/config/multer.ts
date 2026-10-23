import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export const multerConfig = {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadFolder);
    },
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};