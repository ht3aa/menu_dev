import { Router } from "express";
import Controller from "./controller";
import Service from "./service";
import { loadRestaurantId } from "../../middlewares";
import { authenticate, multer, authenticateTolerate } from "../../utils";

const router = Router({ mergeParams: true });
const service = new Service();
const controller = new Controller(service);

router.use(authenticateTolerate);

router.get("/", controller.list);
router.get("/:id", controller.get);

router.use(authenticate);
router.use(loadRestaurantId);

router.route("/").post(multer.image, loadRestaurantId, controller.create);

// TODO: change the toggle to be patch request
router
  .route("/:id")
  .put(multer.image, controller.update)
  .delete(controller.toggle);

export default router;
