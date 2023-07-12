import { Request, Response, NextFunction } from "express";
import { User as PrismaUser } from "@prisma/client";
import { SimpleError } from "../utils";

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user!.role)) {
      next();
    } else {
      throw new SimpleError(403, "unauthorized to access this endpoint");
    }
  };
}
