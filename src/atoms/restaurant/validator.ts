import { Request } from "express";
import { z } from "zod";
import { Prisma, Restaurant } from "@prisma/client";
import slugify from "slugify";
import _ from "lodash";
import { LocalizedRestaurant } from "./types";
import { convertToRestaurant } from "./helpers";
import { BaseValidator } from "../base";
import SimpleError from "../../utils/errors";

export default class Validator extends BaseValidator {
  _base = {
    name: z.string().transform((n) => {
      return slugify(n, { replacement: "-", lower: true, locale: "en" });
    }),
    colors: z.array(z.string().default("#ff0000")),
    description: z.string(),
    description_ar: z.string(),
    address: z.string(),
    address_ar: z.string(),
    addressLink: z.string(),
    groupName: z.string(),
    image: z.string().optional(),
  };

  constructor(request: Request) {
    super(request);
  }

  create = async (): Promise<Omit<Restaurant, "id" | "active" | "image">> => {
    const schema = z.object(this._base);

    const data: Omit<LocalizedRestaurant, "id" | "active" | "image"> =
      await schema.parseAsync(this._req.body);

    const result: Omit<Restaurant, "id" | "active" | "image"> = {
      ...data,
      description: {
        en: data.description,
        ar: data.description_ar,
      } as Prisma.JsonObject,
      address: { en: data.address, ar: data.address_ar } as Prisma.JsonObject,
    };

    return result;
  };

  update = async (): Promise<Partial<Restaurant>> => {
    const schema = z.object(this._base).partial();

    const data: Partial<LocalizedRestaurant> = await schema.parseAsync(
      this._req.body
    );

    if (
      data.description ||
      data.description_ar ||
      data.address_ar ||
      data.address
    ) {
      const newData = _.omit(data, ["address_ar", "description_ar"]);
      return this.setMediaFields(convertToRestaurant(newData));
    }
    const newData = _.omit(data, ["address_ar", "description_ar"]);
    return this.setMediaFields(newData);
  };

  setMediaFields = async (data: any) => {
    const d = await data;
    const files: any = this._req.files;

    if (files.image[0]) {
      d.image = files.image[0].location;
    } else {
      throw new SimpleError(400, "please add an image");
    }

    return d;
  };

  override getBase = () => {
    return this._base;
  };
}
