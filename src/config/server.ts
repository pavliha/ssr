import * as webpack from 'webpack'

export default {
  name: 'server',
  target: 'node',
  entry: './src/server.tsx',
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.tsx?$/, exclude: /node_modules/, use: ['ts-loader'] }
    ]
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 } as any)]
}
