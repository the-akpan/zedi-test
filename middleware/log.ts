import _morgan from "morgan";

import log from "../config/log";

export const morgan = _morgan(":method :url :status - :response-time ms", {
  stream: {
    write: (message: string) => log.info(message.trim()),
  },
});
