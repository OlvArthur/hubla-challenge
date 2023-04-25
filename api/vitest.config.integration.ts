import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.ts'],
    threads: false, // avoid tests affecting each other on database interactions
    setupFiles: ['src/tests/helpers/setup.ts']
  }
})
