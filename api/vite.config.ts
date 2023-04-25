import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    reporters: ['default', 'html'],
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
