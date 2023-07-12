import { Request } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { BaseValidator } from "../base";
import { Validator as RestaurantValidator } from "../restaurant";
import { SimpleError } from "../../utils";

export default class Validator extends BaseValidator {
  constructor(req: Request) {
    super(req);
  }

  fields = {
    phoneNumber: z.string().min(2).max(32),
    password: z.string().min(8).max(32),
  };

  login = () => {
    const schema = z.object({
      phoneNumber: this.fields.phoneNumber,
      password: z.string(),
    });

    return schema.parse(this._req.body);
  };

  register = async () => {
    const schema = z.object({
      phoneNumber: this.fields.phoneNumber,
      password: this.fields.password.transform((value) =>
        bcrypt.hash(value, 12)
      ),
      username: z.string().min(2).max(32),
      restaurant: z.string().transform((value) => JSON.parse(value)),
    });

    const data = schema.parseAsync(this._req.body);

    const restaurantValidator = new RestaurantValidator(this._req);

    const restaurantBase = await restaurantValidator.getBase();

    await z.object(restaurantBase).parseAsync((await data).restaurant);

    return await this.setMediaFields(data);
  };

  refreshToken = () => {
    const schema = z.object({
      refreshToken: z.string(),
    });

    return schema.parse(this._req.body);
  };

  setMediaFields = async (data: any) => {
    const d = await data;
    const files: any = this._req.files;

    if (files.image[0]) {
      d.restaurant.image = files.image[0].location;
    } else {
      throw new SimpleError(400, "please add an image");
    }

    return d;
  };

  update = async () => {
    const schema = z
      .object({
        phoneNumber: this.fields.phoneNumber,
        password: this.fields.password.transform((value) =>
          bcrypt.hash(value, 12)
        ),
        username: z.string().min(2).max(32),

        active: z.boolean(),
      })
      .partial();

    return schema.parseAsync(this._req.body);
  };

  create = async () => {
    const schema = z.object({
      phoneNumber: this.fields.phoneNumber,
      password: this.fields.password.transform((value) =>
        bcrypt.hash(value, 12)
      ),
      username: z.string().min(2).max(32),

      restaurantId: z.string().uuid(),

      active: z.boolean(),
    });

    return schema.parseAsync(this._req.body);
  };
}
