import { setPort } from './config'

export * from './config'

class Config {
  PORT: number

  constructor() {
    this.PORT = setPort()
  }
}

const config = new Config()

export default config