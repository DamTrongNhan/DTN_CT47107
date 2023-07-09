import express from "express";
import passport from "@config/passport";

import {
  createProduct,
  getProduct,
  getAllProduct,
  getAllProductBySmallHolder,
  updateProduct,
  deleteProduct,
} from "@controller/product.controller";

export default (router: express.Router) => {
  router.post(
    "/Product/createProduct/:id",
    passport.authenticate("jwt", { session: false }),
    createProduct
  );
  router.get(
    "/Product/getProduct/:id",
    // passport.authenticate("jwt", { session: false }),
    getProduct
  );
  router.get(
    "/Product/getAllProduct/:id",
    // passport.authenticate("jwt", { session: false }),
    getAllProductBySmallHolder
  );
  router.get(
    "/Product/getAllProduct",
    // passport.authenticate("jwt", { session: false }),
    getAllProduct
  );
  router.post(
    "/Product/updateProduct/:id",
    passport.authenticate("jwt", { session: false }),
    updateProduct
  );
  router.delete(
    "/Product/deleteProduct/:id",
    passport.authenticate("jwt", { session: false }),
    deleteProduct
  );
};
