const envs = {
  staging: "staging",
  development: "development",
  production: "production",
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  (() => {
    let env = process.env.ENV;
    let config = {
      compiler: {
        styledComponents: true,
      },
      env: {
        baseUrl: process.env.BASE_URL,
        apiBase: process.env.API_BASE,
        googleLoginClientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
      },
    };
    if (env === envs.development) {
      config.reactStrictMode = true;
    } else if (env === envs.staging) {
      // add staging custom env vars
    } else if (env === envs.production) {
      // add production custom env vars
    }
    return config;
  })()
);
