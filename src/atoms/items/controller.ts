import { Request, Response } from "express";
import { Item, User as PrismaUser } from "@prisma/client";
import Service from "./service";
import { itemTypesWithId } from "./helpers";
import Validator from "./validator";
import { rename, deLocalize } from "../../utils";

export default class Controller {
  private readonly _service;

  constructor(service: Service) {
    this._service = service;
  }

  create = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data = await validator.create();

    const result = await this._service.create(
      itemTypesWithId(data) as Omit<Item, "id" | "active">
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  };

  update = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const id = await validator.getId();

    const data = await validator.update();

    const restaurantName = (await validator.getRestaurantNameFromUser(
      req.user as PrismaUser
    )) as string;

    const newData = await this._service.update(
      id,
      itemTypesWithId(data),
      restaurantName
    );

    const result = deLocalize(newData);

    res.status(201).json({
      success: true,
      data: result,
    });
  };

  get = async (req: Request, res: Response) => {
    const isAdmin = req?.user as PrismaUser;

    const validator = new Validator(req);

    const id = await validator.getId();

    const restaurantName = await validator.getRestaurantName();

    const data = await this._service.get(id, restaurantName);
    const lang = req.headers["accept-language"]?.includes("en") ? "en" : "ar";

    const result = isAdmin ? deLocalize(data) : rename(lang, data);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  list = async (req: Request, res: Response) => {
    const isAdmin = req?.user as PrismaUser;

    const validator = new Validator(req);

    const restaurantName = await validator.getRestaurantName();

    const listByCategory = req.query.listByCategory == "true";

    const data = await this._service.list(restaurantName, listByCategory);
    const lang = req.headers["accept-language"]?.includes("en") ? "en" : "ar";

    const result = isAdmin ? deLocalize(data) : rename(lang, data);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  toggle = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const id = await validator.getId();

    const restaurantName = (await validator.getRestaurantNameFromUser(
      req.user as PrismaUser
    )) as string;

    await this._service.toggle(id, restaurantName);

    res.status(204).json();
  };
}
