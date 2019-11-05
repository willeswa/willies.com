import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Cards from "../components/card"
import Button from "../components/button"
import layout from "./pages.module.css"

export default ({data}) => (
  <Layout>
    <div className={layout.social}>
      <span>
        <a
          href={data.site.siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={layout.linkedin}
        >
          linkedin
        </a>
      </span>
      <span>
        <a href={data.site.siteMetadata.github} target="_blank" rel="noopener noreferrer" className={layout.github}>
          github
        </a>
      </span>
      <span>
        <a href={data.site.siteMetadata.twitter} target="_blank" rel="noopener noreferrer" className={layout.twitter}>
          twitter
        </a>
      </span>
    </div>
    <div>
      <h4 className={layout.postsHeader}>Recent Posts</h4>
      
        {data.allMarkdownRemark.edges.map(({node}, index) => (
           <Cards
           key={index}
           post={node.frontmatter}
         />
        ))}
    
      <Button text="all posts >>" />
    </div>
  </Layout>
)


export const query = graphql `
query {
  site {
    siteMetadata {
      github
      linkedin
      twitter
    }
  }
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          tag
          date(fromNow: true)
          idealist
          title
        }
      }
    }
  }
}`
