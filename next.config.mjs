/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const nextConfig = prod
	? {
			output: 'export',
			basePath: baseUrl,
			distDir: './docs'
			// images: {
			// 	loader: 'custom',
			// 	loaderFile: './customImageLoader.ts'
			// }
		}
	: {}

export default nextConfig
