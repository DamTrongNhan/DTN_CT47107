import { NextFunction } from "express";
import WorkersModel from "@models/workers.model";
import WorkersDocument from "@interfaces/model/workers";
import SmallHolderModel from "@models/smallHolder.model";
import SmallHolderDocument from "@interfaces/model/smallHolder";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  SmallHolderModel.findOne({ _id: req.params.id })
    .then((SmallHolderResult) => {
      if (SmallHolderResult) {
        WorkersModel.create({
          ...req.body,
          smallHolderId: SmallHolderResult._id,
        })
          .then((Workers) => {
            if (Workers) {
              SmallHolderModel.updateOne(
                { _id: SmallHolderResult._id },
                { $push: { workersId: Workers._id } }
              )
                .then(() => {
                  return res
                    .status(200)
                    .json({ message: "Create Workers successfully" });
                })
                .catch((err) => next(err));
            }
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      }
    })
    .catch((err) => next(err));
};

export const getWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  WorkersModel.findOne({ _id: req.params.id })
    .then((Workers) => {
      return res.status(200).json({ data: Workers });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  console.log(req.params.id);

  WorkersModel.find({ smallHolderId: req.params.id })
    .then((Workers) => {
      return res.status(200).json({ data: Workers });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const updateWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  if (Object.values(req.body).length === 0) {
    return res.status(400).json({ message: "Missing something???" });
  }
  WorkersModel.findById(req.params.id)
    .then((Workers) => {
      if (Workers) {
        WorkersModel.updateOne({ _id: Workers._id }, { $set: { ...req.body } })
          .then(() => {
            return res.status(200).json({
              message: "Workers information has been updated.",
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

export const deleteWorkers = (req: any, res: any, next: NextFunction): any => {
  WorkersModel.findOneAndDelete({ _id: req.params.id }, { new: true })
    .then((deleteWorkersResult: any) => {
      SmallHolderModel.updateOne(
        { _id: deleteWorkersResult.smallHolderId },
        { $pull: { workersId: deleteWorkersResult._id } }
      )
        .then(() => {
          return res
            .status(200)
            .json({ message: "Workers has been deleted.", status: true });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
