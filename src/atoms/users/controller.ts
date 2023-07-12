import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Validator from "./validator";
import Service from "./service";
import { loginObject, refreshTokens } from "./helpers";
import { UserRestaurant } from "./types";
import { SimpleError } from "../../utils";
import { User } from "@prisma/client";

const service = new Service();

export default class Controller {
  static login = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data = validator.login();

    const user = await service.getUserByUsername(data.phoneNumber, false);

    // Check for password
    if (
      !user ||
      !(await bcrypt.compare(data.password, user.password as string))
    ) {
      throw new SimpleError(
        400,
        "Unable to login with the provided credentials."
      );
    }

    // Check for account activation state
    if (!user.active) {
      throw new SimpleError(400, "Your account is deactivated.");
    }

    // Login object
    const object = loginObject(user);

    return res
      .status(200)
      .cookie("access-token", object.tokens.access, {
        path: "/",
        httpOnly: true,
      })
      .json(object);
  };

  static register = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data: UserRestaurant = await validator.register();

    const user = await service.createUser(data, false);

    return res.status(201).json(loginObject(user));
  };

  static profile = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("Code error");
    }

    return res.status(200).json(await service.getUserById(req.user.id));
  };

  static refreshTokens = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data = validator.refreshToken();

    const user = await refreshTokens(data.refreshToken);

    if (!user) {
      throw new SimpleError(
        400,
        "Unable to refresh your tokens with the provided refresh token."
      );
    }

    const object = loginObject(user);

    return res
      .status(200)
      .cookie("access-token", object.tokens.access, {
        path: "/",
        httpOnly: true,
      })
      .json(object);
  };

  static list = async (req: Request, res: Response) => {
    const data = await Service.getAllUsers();

    res.status(200).json({ success: true, data });
  };

  static updateUsers = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const id = await validator.getId();

    const data = await validator.update();

    const newData = await Service.updateUser(id, data);

    res.status(201).json({ success: true, data: newData });
  };

  static listRestaurantUsers = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const restaurantId = await validator.getRestaurantId();

    const data = await Service.getAllUsersOfRestaurant(restaurantId);

    res.status(201).json({ success: true, data });
  };

  static createUserForRestaurant = async (req: Request, res: Response) => {
    const validator = new Validator(req);

    const data: any = await validator.create();

    data.role = "ADMIN";

    const newData = await Service.createUserToRestaurant(data);

    res.status(201).json({ success: true, data: newData });
  };
}
