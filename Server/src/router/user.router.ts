import express from "express";
import passport from "@config/passport";
import bcrypt from "bcrypt";
import {
  getUser,
  createUser,
  getAllUser,
  updateProfile,
  deleteAccount,
  getUserBySmallHolder,
} from "@controller/user.controller";

export default (router: express.Router) => {
  router.post(
    "/user/createUser/",
    passport.authenticate("jwt", { session: false }),
    createUser
  );
  router.get(
    "/user/getUser/:id",
    passport.authenticate("jwt", { session: false }),
    getUser
  );
  router.get(
    "/user/getUserBySmallHolder/:id",
    // passport.authenticate("jwt", { session: false }),
    getUserBySmallHolder
  );
  router.get(
    "/user/getAllUser",
    passport.authenticate("jwt", { session: false }),
    getAllUser
  );
  router.post(
    "/user/updateProfile",
    (req, res, next) => {
      if (req.body.password) {
        bcrypt.genSalt(10, (err: Error, salt) => {
          if (err) {
            return next(err);
          }
          bcrypt.hash(req.body.password, salt, (hashError, hash) => {
            if (hashError) {
              return next(hashError);
            }
            req.body.password = hash;
            next();
          });
        });
      } else next();
    },
    passport.authenticate("jwt", { session: false }),
    updateProfile
  );
  router.delete(
    "/user/deleteAccount/:id",
    passport.authenticate("jwt", { session: false }),
    deleteAccount
  );
};
