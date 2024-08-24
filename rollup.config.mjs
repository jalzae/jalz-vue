import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    vue(),
    postcss({
      extract: true,
    }),
    resolve(),
    commonjs(),

  ],
  external: ['vue'],
  context: 'window',
};
