import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs/index.js',
      format: 'cjs',
    },
    {
      dir: 'dist/esm/index.js',
      format: 'esm'
    }
  ],
  plugins: [
    del({ targets: 'dist' }),
    typescript({ tsconfig: './tsconfig.json', useTsconfigDeclarationDir: true })
  ],
};
