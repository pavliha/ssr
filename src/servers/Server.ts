import express, { Application } from 'express'
import { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import * as http from 'http'
import { Webpack } from '../webpack'

const app = express()

export type Mode = 'development' | 'production'

interface ServerConfig {
  publicPath: string
  serverPath: string
  mode: Mode
}

abstract class Server {
  protected config: ServerConfig

  protected constructor(config: ServerConfig, webpack: Webpack) {
    this.config = config
  }

  abstract start(): Server

  use(...params: any) {
    app.use(params)
  }

  render(jsx: ReactElement, template: (html: string) => string) {
    const html = renderToString(jsx)
    template(html)

    return this
  }

  listen(port: number, callback?: (...args: any[]) => void): http.Server {
    return app.listen(port, callback)
  }
}

export default Server
