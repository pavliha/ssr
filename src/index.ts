import { Mode, Server } from './servers/Server'
import yargs from 'yargs'
import { readFileSync } from 'fs'
// @ts-ignore
import nodeEval from 'node-eval'
import { configure } from './configure'
import { Webpack } from './webpack'
import { DevelopmentServer } from './servers/DevelopmentServer'

const argv = yargs.argv

const mode: Mode = argv.mode as any

const config = nodeEval(readFileSync(process.cwd() + '/webpack.config.js', 'utf-8'))

const [serverConfig, clientConfig] = configure(config)

const webpack = new Webpack([serverConfig, clientConfig])

const modes = {
  'development': DevelopmentServer,
  'production': ProductionServer
}

let server
if(mode == 'development'){

}

export const server = new Server({
  mode,
  publicPath: config.output.path,
  serverPath: `${serverConfig.output.path}/${serverConfig.output.filename}`
})

server.start().catch(console.error)
