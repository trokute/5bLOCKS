import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	base: '/5bLOCKS/',
	plugins: [svelte()],
	server: { host: true }
})
