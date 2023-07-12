import { Router } from "express";
import passport from "passport";
import Controller from "./controller";
import { authorize } from "../../middlewares";
import { multer, authenticate } from "../../utils";

const router = Router();

router.post("/login", Controller.login);

router.use(authenticate);
router.use(authorize("SUPER_ADMIN"));

router.post("/register", multer.image, Controller.register);
router.get("/list", Controller.list);
router.post("/createUser", Controller.createUserForRestaurant);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  Controller.profile
);

router.post("/refresh-tokens", Controller.refreshTokens);

router.put("/updateUser/:id", Controller.updateUsers);

export default router;
