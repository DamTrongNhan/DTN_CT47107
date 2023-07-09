import mongoose from "mongoose";
import bluebird from "bluebird";
import { MongoError } from "mongodb";

import Locals from "@provider/locals";

export class Database {
  public static init(): any {
    (mongoose as any).Promise = bluebird;
    mongoose
      .connect(Locals.config().mongoUri)
      .then(() => {
        console.log("Connected to MongoDB!");
      })
      .catch((error: MongoError) => {
        console.error("Error connecting to MongoDB: ", error);
        console.log(error);
        process.exit(1);
      });
  }
}

export default mongoose;
