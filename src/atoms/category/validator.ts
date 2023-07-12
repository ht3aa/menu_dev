import { Request } from "express";
import { z } from "zod";
import { Category, User as PrismaUser } from "@prisma/client";
import { convertToCategory } from "./helpers";
import { BaseValidator } from "../base";

export default class Validator extends BaseValidator {
  _base = {
    name: z.string(),
    name_ar: z.string(),
    icon: z.string(),
    place: z.number(),
  };

  constructor(req: Request) {
    super(req);
  }

  create = async (): Promise<Omit<Category, "id" | "active" | "item">> => {
    const schema = z.object(this._base);

    const result = await schema.parseAsync(this._req.body);

    const data = {
      ...result,
      restaurantId: this._req.user!.restaurantId,
    };

    return convertToCategory(data) as Category;
  };

  update = async (): Promise<Partial<Category>> => {
    const schema = z.object(this._base).partial();

    const data = await schema.parseAsync(this._req.body);

    if (data.name_ar || data.name) {
      return convertToCategory(data);
    }

    return data;
  };
}
