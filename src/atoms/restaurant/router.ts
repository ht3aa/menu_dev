import { Router } from "express";
import Controller from "./controller";
import Service from "./service";
import { authorize } from "../../middlewares";
import { authenticate } from "../../utils";
import { multer } from "../../utils";

const router = Router({ mergeParams: true });
const service = new Service();
const controller = new Controller(service);

router.get("/:restaurantName/getGroup", controller.getByGroup);

router.use(authenticate);
// router.use(authorize("SUPER_ADMIN"));

router.get("/", controller.list);

router.get("/:id", controller.get);

router
  .route("/:id")
  .put(multer.image, controller.update)
  .patch(controller.toggle);

export default router;
