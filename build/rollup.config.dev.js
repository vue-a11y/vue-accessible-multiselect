import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from 'rollup-plugin-replace'

import plugins from './base/plugins/index'

export default {
  input: path.resolve(__dirname, '../demo/index.js'),
  output: {
    file: path.resolve(__dirname, '../demo/demo.js'),
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    serve({
      open: true,
      contentBase: path.resolve(__dirname, '../demo'),
      port: 8080,
    }),
    livereload({
      verbose: true,
      watch: path.resolve(__dirname, '../demo'),
    }),
  ].concat(plugins),
}