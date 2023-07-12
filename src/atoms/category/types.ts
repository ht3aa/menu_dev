import { Category } from "@prisma/client";

export interface LocalizedCategory extends Category {
  name: string;
  name_ar: string;
}
