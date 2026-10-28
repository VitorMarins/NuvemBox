import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Aponta para a pasta física 'meu-drive/meu-drive' a partir da raiz
const uploadFolder = path.resolve(
  __dirname,
  "..",
  "..",
  "drive",
  "meu-drive",
);

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

export const multerConfig = {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadFolder);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
};
