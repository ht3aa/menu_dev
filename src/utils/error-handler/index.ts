import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import multer from "multer";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import prismaErrorHandler from "./prisma-error";
import { SimpleError } from "..";
import { ENVIRONMENT } from "../secrets";

const handler = async (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.debug("zod err");

    console.log(error);

    const { message, path } = error.issues[0];

    return res.status(400).json({
      detail: `${path}: ${message}`,
    });
  }

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandler(req, res, error);
  }

  // Simple error
  if (error instanceof SimpleError) {
    return res.status(error.status).json({ detail: error.detail });
  }

  // Multer error handler
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ detail: error });
  }

  if (ENVIRONMENT === "development") {
    console.log(error);

    return res.status(500).json({
      detail: "Unhandled error, please report the error object to the backend",
      error,
    });
  }

  return res
    .status(500)
    .json({ detail: "Unhandled error, please report this." });
};

export default handler;
