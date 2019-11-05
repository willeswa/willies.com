/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `wanjala`,
    description: `The software engineer from Kibra`,
    author: `Willies Wanjala`,
    linkedin: `https://www.linkedin.com/in/godfrey-wanjala-14601a73/`,
    github: `https://github.com/willeswa`,
    twitter: `https://twitter.com/wanjalake`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Willies Wanjala`,
        short_name: `Wanjala`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
