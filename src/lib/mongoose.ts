import mongoose from "mongoose";
import { TransactionModel } from "@/models/transaccion";
import { UserModel } from "@/models/user";
import { SessionModel } from "@/models/session";
import { logger } from "./logger";

const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
    );
  }
  return mongoose
    .connect(process.env.MONGODB_URI)
    .catch((e) => logger.error({ e }, "mongoo error conection"));
};

export default connectMongo;

