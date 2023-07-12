import { Banner } from "@prisma/client";
import { SimpleError } from "../../utils";
import { s3 } from "../../utils/clients";
import { AWS_BUCKET_NAME } from "../../utils/secrets";
import prisma from "../../../prisma";

export default class Service {
  create = async (data: Omit<Banner, "id">): Promise<Banner> => {
    return await prisma.banner.create({
      data,
    });
  };

  update = async (
    id: string,
    data: Partial<Banner>,
    restaurantName: string
  ): Promise<Banner> => {
    const entity = await prisma.banner.findFirst({
      where: { id, restaurant: { active: true, name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "unavailable banner");
    }

    const imageKey = entity?.image.split("/")[3] || "";

    if (data.image) {
      s3.deleteObjects(
        {
          Bucket: AWS_BUCKET_NAME,
          Delete: { Objects: [{ Key: imageKey }] },
        },
        (err, d) => {}
      );
    }

    return await prisma.banner.update({ where: { id }, data });
  };

  list = async (restaurantName: string): Promise<Banner[]> => {
    const data = prisma.banner.findMany({
      where: {
        active: true,
        restaurant: { name: restaurantName, active: true },
      },
    });

    return data;
  };

  get = async (id: string, restaurantName: string): Promise<Banner | null> => {
    return await prisma.banner.findFirst({
      where: { id, restaurant: { name: restaurantName } },
    });
  };

  toggle = async (id: string, restaurantName: string) => {
    const entity = await prisma.banner.findFirst({
      where: { active: true, id, restaurant: { name: restaurantName } },
    });

    if (!entity) {
      throw new SimpleError(400, "unavailable restaurant");
    }

    await prisma.banner.update({
      where: { id },
      data: { active: !entity.active },
    });
  };
}
