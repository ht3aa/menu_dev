import { Request } from "express";
import { z } from "zod";
import { Type } from "@prisma/client";
import { BaseValidator } from "../base";

export default class Validator extends BaseValidator {
  _base = {
    value: z.string(),
    value_ar: z.string(),
    price: z.number(),
    outerTypeId: z.string().uuid(),
    restaurantId: z.string(),
  };

  constructor(req: Request) {
    super(req);
  }

  create = async (): Promise<Omit<Type, "id" | "active">> => {
    const schema = z.object(this._base);

    return await schema.parseAsync(this._req.body);
  };

  update = async (): Promise<Partial<Type>> => {
    const schema = z.object(this._base).partial();

    return await schema.parseAsync(this._req.body);
  };
}
