import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr(),
		react(),
		legacy({
			targets: ['chrome < 60', 'edge < 15'],
			renderLegacyChunks: true,
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			modernPolyfills: true,
			polyfills: [
				'es.symbol',
				'es.array.filter',
				'es.promise',
				'es.promise.finally',
				'es/map',
				'es/set',
				'es.array.for-each',
				'es.object.define-properties',
				'es.object.define-property',
				'es.object.get-own-property-descriptor',
				'es.object.get-own-property-descriptors',
				'es.object.keys',
				'es.object.to-string',
				'web.dom-collections.for-each',
				'esnext.global-this',
				'esnext.string.match-all',
			],
		}),
	],
	resolve: {
		alias: {
			'@comps': resolve(__dirname, './src/components'),
			'@assets': resolve(__dirname, './src/assets'),
			'@icons': resolve(__dirname, './src/assets/icons'),
			'@store': resolve(__dirname, './src/store'),
			'@pages': resolve(__dirname, './src/pages'),
			'@path': resolve(__dirname, './src/path_map.ts'),
			'@hooks': resolve(__dirname, './src/hooks'),
			'@apis': resolve(__dirname, './src/apis'),
			'@typings': resolve(__dirname, './src/typings'),
			'@lib': resolve(__dirname, './src/lib'),
			'@styles': resolve(__dirname, './src/styles'),
			'@svgs': resolve(__dirname, './src/assets/svgs'),
		},
	},
})
