import { Request, Response } from "express";
import { User as PrismaUser } from "@prisma/client";
import Service from "./service";
import Validator from "./validator";

export default class Controller {
  private readonly _service;

  constructor(service: Service) {
    this._service = service;
  }

  create = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data = await validator.create();

    const result = await this._service.create(data);

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

    const newData = await this._service.update(id, data, restaurantName);

    res.status(201).json({
      success: true,
      data: newData,
    });
  };

  get = async (req: Request, res: Response) => {
    const isAdmin = req.user as PrismaUser;

    const validator = new Validator(req);

    const id = await validator.getId();

    const restaurantName = await validator.getRestaurantName();

    const data = await this._service.get(id, restaurantName);

    res.status(200).json({
      success: true,
      data,
    });
  };

  list = async (req: Request, res: Response) => {
    const isAdmin = req.user as PrismaUser;

    const validator = new Validator(req);

    const restaurantName = await validator.getRestaurantName();

    const data = await this._service.list(restaurantName);

    res.status(200).json({
      success: true,
      data,
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
