import { Item } from "@prisma/client";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { LocalizedItem } from "./types";

export const convertToItem = (
  data: LocalizedItem | Partial<LocalizedItem>
): Item | Partial<Item> => {
  const newData: Partial<Item> = { ...data };

  newData.name = {};
  newData.description = {};

  if (data.name) {
    newData.name["en"] = data.name;
  }

  if (data.name_ar) {
    newData.name["ar"] = data.name_ar;
  }

  if (data.description) {
    newData.description["en"] = data.description;
  }

  if (data.description_ar) {
    newData.description["ar"] = data.description_ar;
  }

  return _.omit(newData, ["name_ar", "description_ar"]);
};

export const itemTypesWithId = (
  data: Omit<Item, "id" | "active"> | Partial<Item>
): Omit<Item, "id" | "active"> | Partial<Item> => {
  if (data.outerType) {
    const newOuterTypes = data.outerType.map((d) => {
      //@ts-ignore
      const type = { id: uuid(), ...d };

      //@ts-ignore
      type.types = d.types.map((element) => {
        const newElement = { id: uuid(), ...element };

        return newElement;
      });

      return type;
    });

    data.outerType = newOuterTypes;
  }
  return data;
};
