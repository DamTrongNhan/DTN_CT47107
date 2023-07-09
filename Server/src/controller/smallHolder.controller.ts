import { NextFunction } from "express";
import UserModel from "@models/user.model";
import WorkerModel from "@models/workers.model";
import UserDocument from "@interfaces/model/user";
import SmallHolderModel from "@models/smallHolder.model";
import SmallHolderDocument from "@interfaces/model/smallHolder";
import ProductModel from "@models/product.model";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const getSmallHolder = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  SmallHolderModel.findOne({ _id: req.params.id })
    .then((SmallHolder) => {
      return res.status(200).json({ data: SmallHolder });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const getAllSmallHolderByVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  SmallHolderModel.find({ villageId: req.params.id })
    .then((SmallHolder) => {
      return res.status(200).json({ data: SmallHolder });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const getAllSmallHolder = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  SmallHolderModel.find({})
    .then((SmallHolder) => {
      return res.status(200).json({ data: SmallHolder });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const updateSmallHolder = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);

  if (Object.values(req.body).length === 0) {
    return res.status(400).json({ message: "Missing something???" });
  }
  SmallHolderModel.findById(req.params.id)
    .then((SmallHolder) => {
      if (SmallHolder) {
        SmallHolderModel.updateOne(
          { _id: req.params.id },
          { $set: { ...req.body } }
        )
          .then(() => {
            return res.status(200).json({
              message: "SmallHolder information has been updated.",
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

export const deleteSmallHolder = (
  req: any,
  res: any,
  next: NextFunction
): void => {
  SmallHolderModel.deleteOne({ _id: req.params.id })
    .then(() => {
      return res
        .status(200)
        .json({ message: "SmallHolder has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
