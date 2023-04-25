import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '.pnp.loader.mjs',
        '.pnp.cjs',
        'src/**/fakes',
        '**/*.spec.ts',
        '**/commons/**',
        '**/shared/**'
      ]
    }
  }
})
