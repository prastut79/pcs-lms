/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	async redirects() {
		return [
			{
				source: "/dashboard",
				destination: "/dashboard/loan",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
