import { Item } from "@prisma/client";

export interface LocalizedItem extends Item {
  name: string;
  name_ar: string;

  description: string;
  description_ar: string;
}
