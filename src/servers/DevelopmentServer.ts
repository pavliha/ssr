import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { Webpack } from '../webpack'
import Server from './Server'

interface ServerConfig {
  publicPath: string
  serverPath: string
}

export class DevelopmentServer extends Server {
  protected config: ServerConfig
  protected webpack: Webpack

  constructor(config: ServerConfig, webpack: Webpack) {

    this.config = config
    this.webpack = webpack
  }

  async start() {
    console.info('Starting development build. Sever side rendering is disabled!')
    const webpack = new Webpack(this.config)
    console.info('Building server for the first time')
    await webpack.buildServer()
    console.info('Start watching client changes...')
    super.use(
      webpackDevMiddleware(webpack.clientCompiler, {
        publicPath: '/',
        writeToDisk: false,
        serverSideRender: true,
        stats: webpack.serverConfig.stats
      })
    )
    app.use(webpackHotMiddleware(webpack.clientCompiler))
    app.use(express.static(webpack.publicPath))
    app.use(this.server(webpack.serverPath))
  }

}
