/** @type {import('next').NextConfig} */
const nextConfig = {
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
