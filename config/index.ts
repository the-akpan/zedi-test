import { setPort } from "./config";
import connect from "./database";
import { setupAdmin } from "./user";

export * from "./cors";

class Config {
  PORT: number;

  constructor() {
    this.PORT = setPort();
  }

  async init(): Promise<void> {
    await connect();
    await setupAdmin();
  }
}

const config = new Config();

export default config;
