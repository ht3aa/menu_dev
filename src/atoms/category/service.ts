import _ from "lodash";
import { Category, Prisma } from "@prisma/client";
import prisma from "../../../prisma";
import { SimpleError } from "../../utils";

export default class Service {
  create = async (
    data: Readonly<Omit<Category, "id" | "items" | "active">>
  ): Promise<Category> => {
    const result = await prisma.category.create({
      data: {
        icon: data.icon,
        restaurantId: data.restaurantId,
        name: data.name as Prisma.JsonObject,
      },
    });

    return result;
  };

  update = async (
    id: Readonly<string>,
    data: Readonly<Partial<Category>>,
    restaurantName: Readonly<string>
  ): Promise<Category> => {
    const entity = await prisma.category.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no such category with this id");
    }

    const newData = { ...data, name: entity.name as {} };

    if (data.name) {
      const oldNames = entity.name;

      newData.name = {
        ...(oldNames as {}),
        ...(data.name as {}),
      } as Prisma.JsonObject;
    }

    const result = await prisma.category.update({
      data: newData,
      where: { id: entity?.id },
    });

    return result;
  };

  get = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<Category | null> => {
    const result = await prisma.category.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
      include: {
        restaurant: {
          select: {
            name: true,
            image: true,
            colors: true,
            addressLink: true,
            address: true,
            description: true,
          },
        },
      },
    });

    if (!result) {
      throw new SimpleError(400, "no such category with this id");
    }

    return result;
  };

  list = async (restaurantName: Readonly<string>): Promise<Category[]> => {
    const result = await prisma.category.findMany({
      where: {
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
      include: {
        restaurant: {
          select: {
            name: true,
            image: true,
            colors: true,
            addressLink: true,
            address: true,
            description: true,
          },
        },
      },
      orderBy: [{ place: "asc" }],
    });

    return result;
  };

  toggle = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<void> => {
    const entity = await prisma.category.findFirst({
      where: { id, restaurant: { name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "no such category with this id");
    }

    const { active } = (await prisma.category.findUnique({
      where: { id },
    })) as Category;

    await prisma.category.update({
      where: { id: entity?.id },
      data: { active: !active },
    });
  };
}
