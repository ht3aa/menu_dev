// This middleware is used to attache the restaurantId to the body of the request

import { Request, Response, NextFunction } from "express";
import { User as PrismaUser } from "@prisma/client";
import { SimpleError } from "../utils";

export const loadRestaurantId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user!.restaurantId) {
    throw new SimpleError(400, "current user is not connected to a restaurant");
  }

  req.body.restaurantId = req.user?.restaurantId;

  return next();
};
