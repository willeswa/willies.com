import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Card from "../components/card"
import pagecss from "./pages.module.css"
import layout from "../components/layout.module.css"
import Prism from "prismjs"

export default ({ data }) => {
  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })
  return (
    <Layout>
      <div className={layout.container}>
        <h4 className={pagecss.postsHeader}>
          <span>Recent Posts</span>
          <span className={layout.back}>
            <a href="/blogs/"> See All Posts &gt;&gt;</a>
          </span>
        </h4>

        <div className={layout.cards}>
          {data.allMarkdownRemark.edges.slice(0, 4).map(({ node }, index) => (
            <div className={layout.column}>
              <Card
                key={index}
                card={node.frontmatter}
                link={node.fields.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
