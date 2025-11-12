/*
Configuration overrides for vitest:
- Exclude the tests from the coverage reports
- Output the coverage reports only as text at runtime
*/
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ["src/test/**", ...coverageConfigDefaults.exclude],
      reporter: ["text"],
    },
  },
})
