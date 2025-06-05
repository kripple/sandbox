import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  reporter: 'list',
  outputDir: 'temp',
  testDir: 'src',
  testMatch: '**/*.test.ts',
});
