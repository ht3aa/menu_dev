import { User } from "@prisma/client";

export interface Tokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: {
    [key: string]: any;
  };
}

export interface UserRestaurant extends User {
  restaurant?: {
    name: string;
    colors: string;
    image: string;
    address_ar: string;
    address: string;
    description: string;
    description_ar: string;
    addressLink: string;
    groupName: string;
  };
  restaurantName?: string;
  colors: string;
  image: string;
}
