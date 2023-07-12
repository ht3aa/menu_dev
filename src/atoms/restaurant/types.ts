import { Restaurant, User } from "@prisma/client";

export interface RestaurantUser extends Restaurant {
  Users: Pick<User, "username" | "phoneNumber" | "role">[];
}

export interface LocalizedRestaurant extends Restaurant {
  description: string;
  description_ar: string;
  address: string;
  address_ar: string;
}
