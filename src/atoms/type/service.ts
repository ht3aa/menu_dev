import _ from "lodash";
import { Type } from "@prisma/client";
import prisma from "../../../prisma";
import { SimpleError } from "../../utils";

export default class Service {
  create = async (data: Readonly<Omit<Type, "id" | "active">>) => {
    return await prisma.type.create({ data });
  };

  update = async (
    id: Readonly<string>,
    data: Partial<Type>,
    restaurantName: Readonly<string>
  ) => {
    const entity = await prisma.type.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no such type with this id");
    }

    return await prisma.type.update({ data, where: { id } });
  };

  get = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<Type | null> => {
    const entity = await prisma.type.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no such type with this id");
    }

    return entity;
  };

  list = async (restaurantName: Readonly<string>): Promise<Type[]> => {
    const entity = await prisma.type.findMany({
      where: {
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    return entity;
  };

  toggle = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<void> => {
    const entity = await prisma.type.findFirst({
      where: { id, restaurant: { name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "no such type with this id");
    }

    await prisma.type.update({
      where: { id },
      data: { active: !entity.active },
    });
  };
}
