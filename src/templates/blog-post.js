import React from 'react'
import Layout from '../components/Layout'
import layout from '../components/layout.module.css'
import {graphql} from 'gatsby'

export default ({data}) => {
    const post = data.markdownRemark
    return (
    <Layout>
        <div className={layout.blogPost}>
            <h3> <span className={layout.postTitle}>{post.frontmatter.title}</span> <span className={layout.backPost}>Back</span></h3>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    </Layout>
    )
}

export const query = graphql`
query($slug: String!){
    markdownRemark(fields: {slug: {eq: $slug}}){
        html
        frontmatter{
            title
        }
    }
}`