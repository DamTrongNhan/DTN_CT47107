import { NextFunction } from "express";
import UserModel from "@models/user.model";
import UserDocument from "@interfaces/model/user";
import VillageModel from "@models/smallHolder.model";
import VillageDocument from "@interfaces/model/smallHolder";
import SmallHolderModel from "@models/smallHolder.model";
import SmallHolderDocument from "@interfaces/model/smallHolder";
import WorkersModel from "@models/workers.model";
import ProductModel from "@models/product.model";
import { body, check, validationResult } from "express-validator";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  await check("email", "E-mail cannot be blank").notEmpty().run(req);
  await check("email", "E-mail is not valid").isEmail().run(req);
  await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
  await check("password", "Password cannot be blank").notEmpty().run(req);
  await check("password", "Password must be at least 8 characters long")
    .isLength({ min: 8 })
    .run(req);
  await check("cPassword", "Password do not match").equals(password).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }

  UserModel.findOne({ email })
    .then((existingUser: UserDocument) => {
      if (existingUser) {
        return res
          .status(422)
          .json({ message: "User existing", status: false });
      }
      UserModel.create({
        email,
        password,
        isAdmin: true,
        isAdminSmallHolder: true,
        ...req.body,
      })
        .then((createUserData) => {
          if (createUserData) {
            SmallHolderModel.create({ adminId: createUserData._id })
              .then((createSmallHolder) => {
                if (createSmallHolder) {
                  UserModel.updateOne(
                    { _id: createUserData._id },
                    { $set: { smallHolderId: createSmallHolder._id } }
                  )
                    .then(() => {
                      return res.status(200).json({
                        message: "Create user successfully",
                        status: true,
                      });
                    })
                    .catch((err) => {
                      next(err);
                    });
                }
              })
              .catch((err) => {
                next(err);
              });
          }
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
};
export const getAllUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  UserModel.find({})
    .then((user) => {
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const getUserBySmallHolder = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  console.log(req.params.id);

  UserModel.findOne({ smallHolderId: req.params.id })
    .then((user) => {
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const updateProfile = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const user = req.user as UserDocument;
  UserModel.findById(user._id)
    .then((userResult: UserDocument) => {
      if (userResult) {
        if (Object.values(req.body).length === 0) {
          return res.status(400).json({ message: "Missing something???" });
        }
        UserModel.updateOne({ _id: userResult._id }, { ...req.body })
          .then((userResultUpdate: any) => {
            return res.status(200).json({
              message: "Profile information has been updated.",
              data: userResultUpdate,
              status: true,
            });
          })
          .catch((err: WriteError & CallbackError) => {
            console.log(err);
            if (err.code === 11000)
              return res.status(400).json({
                message:
                  "The email address you have entered is already associated with an account.",
                status: false,
              });
            return next(err);
          });
      }
    })
    .catch((err: NativeError) => {
      console.log(err);
      return next(err);
    });
};


export const deleteAccount = (req: any, res: any, next: NextFunction): void => {
  UserModel.deleteOne({ _id: req.params.id })
    .then(() => {
      SmallHolderModel.findOneAndDelete({ adminId: req.params.id })
        .then((SmallHolderDelete) => {
          if (SmallHolderDelete) {
            ProductModel.deleteMany({
              _id: { $in: SmallHolderDelete.productId },
            })
              .then(() =>
                WorkersModel.deleteMany({
                  _id: { $in: SmallHolderDelete.workersId },
                })
                  .then(() => {
                    return res.status(200).json({
                      message: "Account has been deleted.",
                      status: true,
                    });
                  })
                  .catch((err) => next(err))
              )
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
