import path from 'path'

export default {
  target: 'web',
  entry: './src/client.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
