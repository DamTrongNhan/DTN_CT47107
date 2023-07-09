import { NextFunction } from "express";
import UserModel from "@models/user.model";
import UserDocument from "@interfaces/model/user";
import VillageModel from "@models/smallHolder.model";
import VillageDocument from "@interfaces/model/smallHolder";
import ProductModel from "@models/product.model";
import ProductDocument from "@interfaces/model/product";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";
import SmallHolderModel from "@models/smallHolder.model";

export const createProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  SmallHolderModel.findOne({ _id: req.params.id })
    .then((SmallHolderResult) => {
      ProductModel.create({ ...req.body, smallHolderId: SmallHolderResult._id })
        .then((product) => {
          if (product) {
            SmallHolderModel.updateOne(
              { _id: SmallHolderResult._id },
              { $push: { productId: product._id } }
            )
              .then(() => {
                return res.status(200).json({
                  message: "Create product successfully",
                  data: product,
                });
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    })
    .catch((err) => next(err));
};

export const getProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.findOne({ _id: req.params.id })
    .then((product) => {
      return res.status(200).json({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllProductBySmallHolder = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.find({ smallHolderId: req.params.id })
    .then((product) => {
      return res.status(200).json({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const getAllProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.find({})
    .then((product) => {
      return res.status(200).json({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const updateProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  if (Object.values(req.body).length === 0) {
    return res.status(400).json({ message: "Missing something???" });
  }
  ProductModel.findById(req.params.id)
    .then((product) => {
      if (product) {
        ProductModel.findOneAndUpdate(
          { _id: product._id },
          { $set: { ...req.body } },
          { new: true }
        )
          .then((ProductUpdate) => {
            return res.status(200).json({
              message: "Product information has been updated.",
              data: ProductUpdate,
              status: true,
            });
          })
          .catch((err: WriteError & CallbackError) => {
            console.log(err);
            return next(err);
          });
      }
    })
    .catch((err: NativeError) => {
      console.log(err);
      return next(err);
    });
};

export const deleteProduct = (req: any, res: any, next: NextFunction): any => {
  ProductModel.findOneAndDelete({ _id: req.params.id }, { new: true })
    .then((deleteProductResult: any) => {
      SmallHolderModel.updateOne(
        { _id: deleteProductResult.smallHolderId },
        { $pull: { productId: deleteProductResult._id } }
      )
        .then(() => {
          return res.status(200).json({
            message: "Product has been deleted.",
            data: deleteProductResult,
            status: true,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
