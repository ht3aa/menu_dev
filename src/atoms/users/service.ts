import _ from "lodash";
import { User, Prisma } from "@prisma/client";
import { UserRestaurant } from "./types";
import { getRestaurantName } from "./helpers";
import prisma from "../../../prisma";

export default class Service {
  static reshape = (user: any) => {
    const data = _.omit(user, ["password"]);

    return getRestaurantName(data);
  };

  createUser = async (
    data: Omit<UserRestaurant, "id" | "restaurantId" | "active">,
    reshape = true
  ) => {
    await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        phoneNumber: data.phoneNumber,
        restaurant: {
          create: {
            name: data.restaurant?.name as string,
            colors: data.restaurant?.colors,
            image: data.restaurant?.image,
            address: {
              en: data.restaurant?.address,
              ar: data.restaurant?.address_ar,
            } as Prisma.JsonObject,
            description: {
              en: data.restaurant?.description,
              ar: data.restaurant?.description_ar,
            } as Prisma.JsonObject,
            addressLink: data.restaurant?.addressLink,
            groupName: data.restaurant?.groupName,
          },
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: { phoneNumber: data.phoneNumber },
      include: {
        restaurant: { select: { name: true, colors: true, image: true } },
      },
    });

    return reshape ? Service.reshape(user) : user;
  };

  getUserById = async (id: string, reshape = true) => {
    const user = await prisma.user.findUnique({ where: { id } });

    return user && reshape ? Service.reshape(user) : user;
  };

  getUserByUsername = async (phoneNumber: string, reshape = true) => {
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        restaurant: { select: { name: true, colors: true, image: true } },
      },
    });

    return user && reshape ? Service.reshape(user) : user;
  };

  static getAllUsers = async () => {
    return await prisma.user.findMany({ include: { restaurant: true } });
  };

  static updateUser = async (
    id: string,
    data: Partial<
      Pick<User, "active" | "username" | "phoneNumber" | "password">
    >
  ) => {
    await prisma.user.update({ where: { id }, data });
  };

  static getAllUsersOfRestaurant = async (
    restaurantId: string
  ): Promise<User[]> => {
    return await prisma.user.findMany({ where: { restaurantId } });
  };

  static createUserToRestaurant = async (
    data: Omit<User, "id">
  ): Promise<User> => {
    return await prisma.user.create({ data });
  };
}
