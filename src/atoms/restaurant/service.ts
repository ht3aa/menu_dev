import { Restaurant } from "@prisma/client";
import _ from "lodash";
import { RestaurantUser } from "./types";
import { SimpleError } from "../../utils";
import prisma from "../../../prisma";

export default class Service {
  get = async (
    id: string
  ): Promise<Pick<
    RestaurantUser,
    "name" | "colors" | "image" | "Users"
  > | null> => {
    const data = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        Users: { select: { username: true, phoneNumber: true, role: true } },
      },
    });

    return data
      ? _.pick(data, [
          "Users",
          "colors",
          "name",
          "image",
          "address",
          "description",
          "addressLink",
        ])
      : null;
  };

  list = async (): Promise<Restaurant[]> => {
    const data = await prisma.restaurant.findMany({
      include: {
        Users: {
          select: {
            active: true,
            username: true,
            password: true,
            phoneNumber: true,
            id: true,
          },
        },
      },
    });

    return data;
  };

  update = async (
    id: Readonly<string>,
    data: Readonly<Partial<Restaurant>>
  ): Promise<Restaurant | null> => {
    const entity = await prisma.restaurant.findFirst({
      where: { id, active: true },
    });

    if (!entity) {
      throw new SimpleError(404, "no restaurant found");
    }

    const newData = {
      ...data,
      description: {
        ...(entity.description as {}),
        ...(data.description as {}),
      },
      address: {
        ...(entity.address as {}),
        ...(data.address as {}),
      },
    };

    const result = await prisma.restaurant.update({
      where: { id },
      data: newData,
    });

    return result;
  };

  toggle = async (id: Readonly<string>) => {
    const { active } = (await prisma.restaurant.findUnique({
      where: { id },
    })) as Restaurant;

    await prisma.restaurant.update({
      where: { id },
      data: { active: !active },
    });
  };

  getByGroup = async (restaurantName: string) => {
    const restaurant = await prisma.restaurant.findUnique({
      where: { name: restaurantName },
    });

    return await prisma.restaurant.findMany({
      where: { groupName: restaurant?.groupName },
      include: { Category: { select: { name: true, icon: true } } },
    });
  };
}
