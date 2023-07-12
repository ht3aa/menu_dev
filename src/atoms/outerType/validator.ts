import { Request } from "express";
import { z } from "zod";
import { Banner, OuterType } from "@prisma/client";
import { BaseValidator } from "../base";

export default class Validator extends BaseValidator {
  _base = {
    name: z.string(),
    name_ar: z.string(),
    restaurantId: z.string().uuid(),
  };

  constructor(req: Request) {
    super(req);
  }

  create = async (): Promise<Omit<OuterType, "id" | "active">> => {
    const schema = z.object(this._base);

    return await schema.parseAsync(this._req.body);
  };

  update = async (): Promise<Partial<OuterType>> => {
    const schema = z.object(this._base).partial();

    return await schema.parseAsync(this._req.body);
  };
}
