import { Restaurant, Prisma } from "@prisma/client";
import _ from "lodash";
import { LocalizedRestaurant } from "./types";

export const convertToRestaurant = (
  data: LocalizedRestaurant | Partial<LocalizedRestaurant>
): Restaurant | Partial<Restaurant> => {
  const newData: Partial<Restaurant> = { ...data };

  newData.address = {} as Prisma.JsonObject;
  newData.description = {} as Prisma.JsonObject;

  if (data.address) {
    newData.address["en"] = data.address;
  }

  if (data.address_ar) {
    newData.address["ar"] = data.address_ar;
  }

  if (data.description) {
    newData.description["en"] = data.description;
  }

  if (data.description_ar) {
    newData.description["ar"] = data.description_ar;
  }

  return _.omit(newData, ["address_ar", "description_ar"]);
};

export const reshape = (data: any[]) => {
  const newData: any[] = [];
  data.map((r) => {
    // console.debug();
    newData.push(_.omit(r, ["active", "address", "addressLink"]));
  });

  return newData;
};
