import express from "express";
import cors from "cors";
import { config as readEnv } from "dotenv";

import config, { corsOptions } from "./config";
import log from "./config/log";
import { useAnonymous } from "./middleware/auth";
import { errorHandler, notFoundHandler } from "./middleware/handlers";
import { morgan } from "./middleware/log";
import router from "./routes";

readEnv();

const app = express();
const PORT = config.PORT;

// middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan);
app.use(useAnonymous);

app.use("/api", router);

// Error handler
app.use(errorHandler);

// 404 handler
app.use(notFoundHandler);

config
  .init()
  .then(() => {
    log.info("Config initialized");
    app.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    log.error(err);
    process.exit(1);
  });
