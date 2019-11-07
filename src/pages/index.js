import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Card from "../components/card"
import Button from "../components/button"
import pagecss from "./pages.module.css"
import layout from "../components/layout.module.css"

export default ({ data }) => (
  <Layout>
    <div className={layout.container}>
      <h4 className={pagecss.postsHeader}>Recent Posts</h4>

      <div className={layout.cards}>
        {data.allMarkdownRemark.edges.slice(0, 4).map(({ node }, index) => (
          <div className={layout.column}>
            <Card key={index} card={node.frontmatter} />
          </div>
        ))}
      </div>
      <Button text="all posts >>" link="/blogs" />
    </div>
  </Layout>
)

export const query = graphql`
query {
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        frontmatter {
          date(fromNow: true)
          summaryPoints
          tag
          title
        }
      }
    }
  }
}
`
