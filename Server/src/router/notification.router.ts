import express from "express";

import {
  create,
  fetch,
  read,
  markUnread,
} from "@controller/notification.controller";

export default (router: express.Router) => {
  router.get("/notification/read/:notificationid", read);
  router.post("/notification/fetch", fetch);
  router.post("/notification/create", create);
  router.post("/notification/markUnread/:notificationid", markUnread);
};
