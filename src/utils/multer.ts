import multerS3 from "multer-s3";
import { v4 as uuid } from "uuid";
import multer from "multer";
import path from "path";
import { SimpleError } from ".";
import { s3 } from "./clients";
import { AWS_BUCKET_NAME } from "./secrets";
import { ContentType } from "../types/s3";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    // TODO: change the access later
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => cb(null, uuid()),
  }),
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // if (
    //   ext !== ".png" &&
    //   ext !== ".jpg" &&
    //   ext !== ".webp" &&
    //   ext !== ".jpeg" &&
    //   ext !== ".jfif"
    // ) {
    //   return cb(new SimpleError(400, "Please provide a valid image") as any);
    // }
    cb(null, true);
  },
});

export const image = upload.fields([{ name: "image", maxCount: 1 }]);

export const uploadToS3 = (file: any, contentType: ContentType) => {
  return new Promise((resolve, reject) => {
    const Key = uuid();
    const params = {
      Body: file,
      Bucket: AWS_BUCKET_NAME,
      Key,
      ACL: "public-read",
      ContentType: contentType,
    };

    s3.upload(params, function (err: any, data: any) {
      if (err) {
        reject(err);
      }

      resolve(data.Location);
    });
  });
};
