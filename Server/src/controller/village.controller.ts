import { NextFunction } from "express";
import UserModel from "@models/user.model";
import VillageModel from "@models/village.model";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.create(req.body)
    .then((village) => {
      if (village) {
        return res.status(200).json({ message: "Create village successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.findOne({ _id: req.params.id })
    .then((village) => {
      return res.status(200).json({ data: village });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.find({})
    .then((village) => {
      return res.status(200).json({ data: village });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const updateVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  if (Object.values(req.body).length === 0) {
    return res.status(400).json({ message: "Missing something???" });
  }
  VillageModel.findById(req.params.id)
    .then((Village) => {
      if (Village) {
        VillageModel.updateOne({ _id: Village._id }, { $set: { ...req.body } })
          .then(() => {
            return res.status(200).json({
              message: "Village information has been updated.",
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

export const deleteVillage = (req: any, res: any, next: NextFunction): void => {
  VillageModel.deleteOne({ _id: req.params.id })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Village has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
