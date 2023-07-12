import { z } from "zod";
import { Request } from "express";
import { Item } from "@prisma/client";
import { convertToItem } from "./helpers";
import { BaseValidator } from "../base";
import { SimpleError } from "../../utils";

export default class Validator extends BaseValidator {
  base = {
    categoryId: z.string().uuid(),
    name: z.string(),
    name_ar: z.string(),
    description: z.string(),
    description_ar: z.string(),
    price: z.string().transform((p) => (Number(p) ? Number(p) : 0)),
    restaurantId: z.string().uuid(),
    outerTypeId: z.string().uuid().optional(),
    outerType: z
      .string()
      // .array(
      //   z.object({
      //     name: z.string(),
      //     name_ar: z.string(),
      //     types: z.array(
      //       z.object({
      //         value: z.string(),
      //         value_ar: z.string(),
      //         price: z.string(),
      //       })
      //     ),
      //   })
      // )
      .transform((j) => JSON.parse(j))
      .default("[]"),
  };

  constructor(req: Request) {
    super(req);
  }

  create = async (): Promise<Omit<Item, "id" | "active">> => {
    const schema = z.object(this.base);

    const data = await schema.parseAsync(this._req.body);

    const newData = this.setMediaFields(data);

    return convertToItem(newData) as Item;
  };

  update = async (): Promise<Partial<Item>> => {
    const schema = z.object(this.base).partial();

    const data = await schema.parseAsync(this._req.body);

    const newData = this.setMediaFields(data);

    if (
      newData.name ||
      newData.name_ar ||
      newData.description ||
      newData.description_ar
    ) {
      return convertToItem(newData);
    }

    // if (newData.description || newData.description_ar) {
    //   return convertToItem(newData);
    // }

    return newData;
  };

  setMediaFields = (data: any): any => {
    const files: any = this._req.files;

    if (files && files.image && files.image[0]) {
      data.image = files.image[0].location;
    } else {
      if (this._req.method == "POST") {
        throw new SimpleError(400, "please add an image");
      }
    }

    return data;
  };
}
