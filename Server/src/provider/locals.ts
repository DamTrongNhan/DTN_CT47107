import * as dotenv from "dotenv";
import * as path from "path";

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    const port = process.env.PORT;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const mongoUri = process.env.MONGO_URI;
    const mailerUsername = process.env.MAILER_USERNAME;
    const mailerPassword = process.env.MAILER_PASSWORD;
    return {
      port,
      jwtExpiresIn,
      jwtSecretKey,
      mongoUri,
      mailerUsername,
      mailerPassword,
    };
  }
}
export default Locals;
