import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import { UserDocument } from "@interfaces/model/user";
import UserModel from "@models/user.model";
import Locals from "@provider/locals";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.serializeUser<any, any>((req, user: UserDocument, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((id: string, done) => {
  UserModel.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() })
      .select("+password")
      .then((user) => {
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
          });
        }
        user.comparePassword(
          password,
          (errorCompare: Error, isMatch: boolean) => {
            if (errorCompare) {
              return done(errorCompare);
            }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, {
              message: "Invalid email or password.",
            });
          }
        );
      })
      .catch((err) => {
        return done(err);
      });
  })
);
type opts = {
  jwtFromRequest: any;
  secretOrKey: string;
};
const opts: opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Locals.config().jwtSecretKey,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
    }
  })
);
export default passport;
