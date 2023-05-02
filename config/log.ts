import winston from "winston";

const log = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.label({ label: "server" }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default log;
