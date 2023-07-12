import { Category } from "@prisma/client";
import _ from "lodash";
import { LocalizedCategory } from "./types";

export const convertToCategory = (
  data: LocalizedCategory | Partial<LocalizedCategory>
): Category | Partial<Category> => {
  const newData: Partial<Category> = { ...data };

  newData.name = {};

  if (data.name) {
    newData.name["en"] = data.name;
  }

  if (data.name_ar) {
    newData.name["ar"] = data.name_ar;
  }

  return _.omit(newData, ["name_ar"]);
};

export const isCategory = (data: any): data is Category => {
  return "name" in data;
};
