import React from "react"
import Layout from "../components/Layout"
import pagecss from "./pages.module.css"
import { graphql } from "gatsby"
import Card from "../components/card"
import layout from "../components/layout.module.css"

export default ({ data }) => (
  <Layout>
    <div className={layout.container}>
      <h4 className={pagecss.postsHeader}>
        <span>See All Posts</span>
        <span className={layout.back}>
          <a href="/"> &lt;&lt; Go Home</a>
        </span>
      </h4>
      <div className={layout.cards}>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <div className={layout.column}>
            <Card key={index} card={node.frontmatter} link={node.fields.slug} />
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query {
   allMarkdownRemark {
    edges {
      node {
        frontmatter {
          date(fromNow: true)
          summaryPoints
          tag
          title
        }
      fields {
        slug
      }
      }
    }
  }
}
`
