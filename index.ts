import express from "express";

import config from "./config";
import log from "./config/log";
import { errorHandler, notFoundHandler } from "./middleware/handlers";
import { morgan } from "./middleware/log";
import router from "./routes";

const app = express();
const PORT = config.PORT;

// middleware
app.use(express.json());
app.use(morgan);

app.use("/api", router);

// Error handler
app.use(errorHandler);

// 404 handler
app.use(notFoundHandler);

app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`);
});
