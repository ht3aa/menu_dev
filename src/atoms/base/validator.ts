import { z } from "zod";
import { Request } from "express";
import { User } from "@prisma/client";
import prisma from "../../../prisma";

export class BaseValidator {
  protected readonly _req: Request;
  protected _base;

  constructor(request: Request) {
    this._req = request;
    this._base = {};
  }

  getId = async (): Promise<string> => {
    const schema = z.string().uuid();

    return schema.parseAsync(this._req.params.id);
  };

  getRestaurantId = async (): Promise<string> => {
    const schema = z.string().uuid();

    return schema.parseAsync(this._req.params.restaurantId);
  };

  getRestaurantName = async (): Promise<string> => {
    const schema = z.string();

    return schema.parseAsync(this._req.params.restaurantName);
  };

  getRestaurantNameFromUser = async (
    user: User
  ): Promise<string | undefined> => {
    const data = await prisma.user.findFirst({
      where: { restaurantId: user.restaurantId },
      include: { restaurant: { select: { name: true } } },
    });

    return data?.restaurant.name;
  };
  getBase = () => {
    return this._base;
  };
}
