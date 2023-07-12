import { Request } from "express";
import { z } from "zod";
import { Banner } from "@prisma/client";
import { BaseValidator } from "../base";
import { SimpleError } from "../../utils";

export default class Validator extends BaseValidator {
  protected _base = {
    link: z.string().url(),
    restaurantId: z.string().uuid(),
  };

  constructor(req: Request) {
    super(req);
  }

  create = async (): Promise<Omit<Banner, "id">> => {
    const schema = z.object(this._base);

    const data = await schema.parseAsync(this._req.body);

    return this.setMediaFields(data);
  };

  update = async (): Promise<Partial<Banner>> => {
    const schema = z.object(this._base).partial();

    const data = await schema.parseAsync(this._req.body);

    return this.setMediaFields(data);
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
