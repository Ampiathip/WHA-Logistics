
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: {and: [/\.(js|ts|md)x?$/]},
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
};

// webpack.config.js
module.exports = {
  // other configurations...

  node: {
    fs: 'empty',
  },
};
