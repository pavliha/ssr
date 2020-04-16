import * as webpack from 'webpack'
import { Compiler, Configuration, MultiCompiler } from 'webpack'

export class Webpack {
  protected multiCompiler: MultiCompiler
  protected configs: [Configuration, Configuration]

  constructor(configs: [Configuration, Configuration]) {
    this.multiCompiler = webpack(configs)
    this.configs = configs
  }

  findCompiler(name: 'client' | 'server'): Compiler {
    return this.multiCompiler.compilers.find((compiler: Compiler) => compiler.name === name)
  }

  get serverConfig() {
    return this.configs[0]
  }

  get clientConfig() {
    return this.configs[1]
  }

  get serverPath() {
    const config = this.serverConfig
    return `${config.output.path}/${config.output.filename}`
  }

  buildServer() {
    return new Promise((resolve, reject) => {
      this.serverCompiler.run((error, stats) => {
        if (error) return reject(error)
        console.log(stats.toString(this.serverConfig.stats))

        resolve(stats)
      })
    })
  }

  build() {
    return new Promise((resolve, reject) => {
      this.multiCompiler.run((error, stats) => {
        if (error) return reject(error)
        console.log(stats.toString(this.serverConfig.stats))

        resolve(stats)
      })
    })
  }
}

module.exports = Webpack
