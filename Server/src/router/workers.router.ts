import express from "express";
import passport from "@config/passport";
import {
  createWorkers,
  getWorkers,
  getAllWorkers,
  updateWorkers,
  deleteWorkers,
} from "@controller/workers.controller";

export default (router: express.Router) => {
  router.post(
    "/Workers/createWorkers/:id",
    passport.authenticate("jwt", { session: false }),
    createWorkers
  );
  router.get(
    "/Workers/getWorkers/:id",
    passport.authenticate("jwt", { session: false }),
    getWorkers
  );
  router.get(
    "/Workers/getAllWorkers/:id",
    passport.authenticate("jwt", { session: false }),
    getAllWorkers
  );
  router.post(
    "/Workers/updateProfile/:id",
    passport.authenticate("jwt", { session: false }),
    updateWorkers
  );
  router.delete(
    "/Workers/deleteWorkers/:id",
    passport.authenticate("jwt", { session: false }),
    deleteWorkers
  );
};
