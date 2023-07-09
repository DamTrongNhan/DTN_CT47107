import express from "express";
import passport from "@config/passport";
import {
  getSmallHolder,
  getAllSmallHolder,
  getAllSmallHolderByVillage,
  updateSmallHolder,
  deleteSmallHolder,
} from "@controller/smallHolder.controller";

export default (router: express.Router) => {
  router.get(
    "/SmallHolder/getSmallHolder/:id",
    // passport.authenticate("jwt", { session: false }),
    getSmallHolder
  );
  router.get(
    "/SmallHolder/getAllSmallHolder/:id",
    // passport.authenticate("jwt", { session: false }),
    getAllSmallHolderByVillage
  );
  router.get(
    "/SmallHolder/getAllSmallHolder",
    // passport.authenticate("jwt", { session: false }),
    getAllSmallHolder
  );
  router.post(
    "/SmallHolder/updateProfile/:id",
    passport.authenticate("jwt", { session: false }),
    updateSmallHolder
  );
  router.delete(
    "/SmallHolder/deleteSmallHolder/:id",
    passport.authenticate("jwt", { session: false }),
    deleteSmallHolder
  );
};
