import React from "react"
import Layout from "../components/Layout"
import layout from "../components/layout.module.css"
import { graphql } from "gatsby"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className={layout.blogPost}>
        <h3>
          <span className={layout.postTitle}>
            {post.frontmatter.title}
          </span>
          <a href="/blogs/" className={layout.backPost}>
            <span>All <br/> Posts</span>
          </a>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <span className={layout.postTag}> #{post.frontmatter.tag}</span>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tag
      }
    }
  }
`
