import express from "express";
import authenticationRoute from "@router/authentication.router";
import notificationRouter from "@router/notification.router";
import userRoute from "@router/user.router";
import villageRoute from "@router/village.router";
import productRoute from "@router/product.router";
import reportRoute from "@router/report.router";
import smallHolderRouter from "@router/smallHolder.router";
import workers from "@router/workers.router";
const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);
  notificationRouter(router);
  userRoute(router);
  villageRoute(router);
  productRoute(router);
  reportRoute(router);
  smallHolderRouter(router);
  workers(router);
  return router;
};
