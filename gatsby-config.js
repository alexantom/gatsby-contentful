require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

process.env.ENABLE_GATSBY_REFRESH_ENDPOINT = true;

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
      process.env.CONTENTFUL_ACCESS_TOKEN ||
      process.env.CONTENTFUL_DELIVERY_TOKEN,
};

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
      "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
    FAST_REFRESH: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
  },
  siteMetadata: {
    title: `Gatsby with Contentful`,
  },
  plugins: [
    `gatsby-plugin-image`,
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false,
        analyzerMode: "static"
      }
    }
  ],
}
