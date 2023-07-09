import express from "express";
import passport from "@config/passport";
import {
  createVillage,
  getVillage,
  getAllVillage,
  updateVillage,
  deleteVillage,
} from "@controller/village.controller";

export default (router: express.Router) => {
  router.post(
    "/village/createVillage",
    passport.authenticate("jwt", { session: false }),
    createVillage
  );
  router.get(
    "/village/getVillage/:id",
    // passport.authenticate("jwt", { session: false }),
    getVillage
  );
  router.get(
    "/village/getAllVillage",
    // passport.authenticate("jwt", { session: false }),
    getAllVillage
  );
  router.post(
    "/village/updateProfile/:id",
    passport.authenticate("jwt", { session: false }),
    updateVillage
  );
  router.delete(
    "/village/deleteVillage/:id",
    passport.authenticate("jwt", { session: false }),
    deleteVillage
  );
};
