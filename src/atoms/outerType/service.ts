import _ from "lodash";
import { OuterType, Prisma } from "@prisma/client";
import prisma from "../../../prisma";
import { SimpleError } from "../../utils";

export default class Service {
  create = async (data: Readonly<Omit<OuterType, "id" | "active">>) => {
    return await prisma.outerType.create({ data });
  };

  update = async (
    id: Readonly<string>,
    data: Partial<OuterType>,
    restaurantName: Readonly<string>
  ) => {
    const entity = await prisma.outerType.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no such outer-type with this id");
    }

    return await prisma.outerType.update({ data, where: { id } });
  };

  get = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<OuterType | null> => {
    const entity = await prisma.outerType.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
      include: {
        // types: {
        //   select: {
        //     value: true,
        //     value_ar: true,
        //     active: true,
        //     price: true,
        //   },
        // },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no such outerType with this id");
    }

    return entity;
  };

  list = async (restaurantName: Readonly<string>): Promise<OuterType[]> => {
    const entity = await prisma.outerType.findMany({
      where: {
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
      include: {
        // types: {
        //   select: {
        //     value: true,
        //     value_ar: true,
        //     active: true,
        //     price: true,
        //   },
        // },
      },
    });

    return entity;
  };

  toggle = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<void> => {
    const entity = await prisma.outerType.findFirst({
      where: { id, restaurant: { name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "no such outerType with this id");
    }

    await prisma.outerType.update({
      where: { id },
      data: { active: !entity.active },
    });
  };
}
