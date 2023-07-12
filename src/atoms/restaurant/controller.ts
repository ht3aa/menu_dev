import { Request, Response } from "express";
import Service from "./service";
import Validator from "./validator";
import { reshape } from "./helpers";
import { deLocalize, rename } from "../../utils";

export default class Controller {
  private readonly _service;

  constructor(service: Service) {
    this._service = service;
  }

  list = async (req: Request, res: Response) => {
    const data = await this._service.list();

    res.status(200).json({
      success: true,
      data,
    });
  };

  get = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const id = await validator.getId();

    const data = await this._service.get(id);

    res.status(200).json({
      success: true,
      data: deLocalize(data),
    });
  };

  update = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data = await validator.update();

    const id = await validator.getId();

    const result = await this._service.update(id, data);

    res.status(200).json({
      success: true,
      data: result,
    });
  };

  toggle = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const id = await validator.getId();

    await this._service.toggle(id);

    res.status(204).json();
  };

  getByGroup = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const restaurantName = await validator.getRestaurantName();

    const data = await this._service.getByGroup(restaurantName);

    const lang = req.headers["accept-language"]?.includes("en") ? "en" : "ar";

    const result = rename(lang, data);

    const reshapedData = reshape(result);

    // console.debug(reshape(result));

    res.status(200).json({
      success: true,
      data: reshapedData,
    });
  };
}
