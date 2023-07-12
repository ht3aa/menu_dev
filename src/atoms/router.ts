import { Router } from "express";
import category from "./category";
import item from "./items";
import users from "./users";
import restaurant from "./restaurant";
import banner from "./banner";
import outerType from "./outerType";
import type from "./type";

const router = Router({ mergeParams: true });

router.use("/users", users);
router.use("/restaurant", restaurant);

router.use("/:restaurantName/category", category);
router.use("/:restaurantName/item", item);
router.use("/:restaurantName/banner", banner);
router.use("/:restaurantName/outer-type", outerType);
router.use("/:restaurantName/type", type);

export default router;
