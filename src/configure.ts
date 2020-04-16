import merge from 'webpack-merge'
import { Configuration, Rule } from 'webpack'
import { server, client } from './config'

const ignoreRules = (rules: Rule[]) => rules.map((rule) => ({ ...rule, loader: 'ignore-loader' }))

const configureServer = (config: Configuration): Configuration => {
  const defaultConfig = {
    ...server,
    module: {
      ...server.module,
      rules: [...server.module.rules, ...ignoreRules(config.module?.rules ?? [])]
    }
  }

  return merge(config as any, defaultConfig as any) as Configuration
}

const configureClient = (config: Configuration): Configuration => {
  return merge(config as any, client as any) as Configuration
}

export const configure = (config: Configuration) => {
  return [configureServer(config), configureClient(config)]
}
