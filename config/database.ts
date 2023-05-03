import mongoose from "mongoose";

import log from "./log";

mongoose.connection.on("connected", () => {
  log.info("Database connected");
});

mongoose.connection.on("error", (err) => {
  log.error(`Database error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  log.info("Database disconnected");
});

const connect = async (): Promise<void> => {
  const dbURI = process.env.MONGO_URI || "";
  try {
    await mongoose.connect(dbURI);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Connect DB failed: ${error.message}`);
    }
  }
};

export default connect;
