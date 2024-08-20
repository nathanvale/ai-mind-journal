/// <reference types="vitest" />

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		sourcemap: true, // Source map generation must be turned on
	},
	plugins: [
		react(),
		sentryVitePlugin({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: 'arthur-b-consulting',
			project: 'my-ai-journal',
		}),
	],
	css: { postcss: { plugins: [] } },
	test: {
		include: ['./app/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup/setup-test-env.ts'],
		globalSetup: ['./tests/setup/global-setup.ts'],
		restoreMocks: true,
		coverage: {
			include: ['app/**/*.{ts,tsx}'],
			all: true,
		},
	},
})
