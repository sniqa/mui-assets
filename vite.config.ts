import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tailwindCSS from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr(),
		react(),
		legacy({
			targets: ['Chrome 69'],
			// renderLegacyChunks: true,
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			modernPolyfills: [
				'es.symbol',
				'es.array.filter',
				'es.global-this',
				'es.object.from-entries',
				'web.queue-microtask'
			],
			
		}),
	],
	
	build: {
		target: ['es2015'],
	},
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
