import path from 'path'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import plugins from './base/plugins/index.js'

const name = 'VueAccessibleMultiselect'

export default [
  {
    input: path.resolve(__dirname, '../src/index.js'),
    output: [
      {
        file: 'dist/vue-accessible-multiselect.js',
        format: 'umd',
        name,
      },
      {
        file: 'dist/vue-accessible-multiselect.common.js',
        format: 'cjs',
      },
      {
        file: 'dist/vue-accessible-multiselect.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ].concat(plugins),
  },
  {
    input: path.resolve(__dirname, '../src/index.js'),
    output: {
      file: 'dist/vue-accessible-multiselect.min.js',
      format: 'umd',
      name,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel(),
      terser(),
    ].concat(plugins),
  },
]
