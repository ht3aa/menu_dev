import { Item, Category, Prisma } from "@prisma/client";
import { SimpleError } from "../../utils";
import { s3 } from "../../utils/clients";
import { AWS_BUCKET_NAME } from "../../utils/secrets";
import prisma from "../../../prisma";

export default class Service {
  create = async (
    data: Readonly<Omit<Item, "id" | "active">>
  ): Promise<Item> => {
    const newData = { ...data, name: {}, description: {} };

    newData.name = data.name as Prisma.JsonObject;
    newData.description = data.description as Prisma.JsonObject;

    const result = await prisma.item.create({
      data: newData,
    });

    return result;
  };

  update = async (
    id: Readonly<string>,
    data: Readonly<Partial<Item>>,
    restaurantName: Readonly<string>
  ): Promise<Item> => {
    const entity = await prisma.item.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
        category: { active: true },
      },
    });

    if (!entity) {
      throw new SimpleError(400, "no item with this id");
    }

    const imageKey = entity.image.split("/")[3];

    if (data.image) {
      s3.deleteObjects(
        {
          Bucket: AWS_BUCKET_NAME,
          Delete: { Objects: [{ Key: imageKey }] },
        },
        (err, d) => {}
      );
    }

    const newData = {
      ...data,
      //@ts-ignore
      name: entity.name as {},
      description: entity.description as {},
    };

    //@ts-ignore: Object is possibly 'null' or 'undefined'
    if (data.name.en || data.name.ar) {
      const oldNames = entity.name;

      //@ts-ignore: Object is possibly 'null' or 'undefined'
      newData.name = { ...oldNames, ...data.name } as Prisma.JsonObject;
    }

    //@ts-ignore: Object is possibly 'null' or 'undefined'
    if (data.description.en || data.description.ar) {
      const oldDescription = entity.description;

      //@ts-ignore: Object is possibly 'null' or 'undefined'
      newData.description = {
        ...(oldDescription as {}),
        ...(data.description as {}),
      } as Prisma.JsonObject;
    }

    const result = await prisma.item.update({ data: newData, where: { id } });

    return result;
  };

  list = async (
    restaurantName: Readonly<string>,
    listByCategory: Readonly<boolean>
  ): Promise<Item[] | Category[]> => {
    const result = listByCategory
      ? await prisma.category.findMany({
          where: {
            active: true,
            restaurant: { name: restaurantName, active: true },
          },
          include: {
            Items: {
              where: { active: true },
              orderBy: [{ name: "asc" }],
            },
            restaurant: { select: { name: true, image: true, colors: true } },
          },
          orderBy: [{ place: "asc" }],
        })
      : await prisma.item.findMany({
          where: {
            active: true,
            restaurant: { name: restaurantName, active: true },
            category: { active: true },
          },
          include: {
            category: { select: { name: true, icon: true } },
            restaurant: { select: { name: true, image: true, colors: true } },
          },
          orderBy: [{ name: "asc" }],
        });

    return result;
  };

  get = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<Item | null> => {
    const result = await prisma.item.findFirst({
      where: {
        id,
        active: true,
        restaurant: { name: restaurantName, active: true },
        category: { active: true },
      },
      include: {
        restaurant: { select: { name: true, image: true, colors: true } },
        category: { select: { name: true, icon: true } },
      },
    });

    if (!result) {
      throw new SimpleError(400, "no item with this id");
    }

    return result;
  };

  toggle = async (
    id: Readonly<string>,
    restaurantName: Readonly<string>
  ): Promise<void> => {
    const entity = await prisma.item.findFirst({
      where: { id, restaurant: { name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "no item with this id");
    }

    const { active } = (await prisma.item.findUnique({
      where: { id },
    })) as Item;

    await prisma.item.update({ where: { id }, data: { active: !active } });
  };
}
