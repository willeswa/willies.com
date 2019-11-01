import React from "react"

import Layout from "../components/Layout"
import Cards from "../components/card"
import Button from "../components/button"
import layout from "./pages.module.css"

export default () => (
  <Layout>
    <div className={layout.aboutron}>
      <p>
        Hi. My name is Willies Wanjala. I am a software developer based in
        Nairobi Kenya. This is a repository of my thoughts, works, beliefs and a
        catalogue of my socially sharable daily habits.
      </p>
    </div>
    <div className={layout.social}>
    <span><a href='https://www.linkedin.com/in/godfrey-wanjala-14601a73/' className={layout.linkedin}>linkedin</a></span> 
    <span><a href='https://github.com/willeswa' className={layout.github}>github</a></span> 
    <span><a href='https://twitter.com/wanjalake' className={layout.twitter}>twitter</a></span>
    </div>
    <div>
      <h4 className={layout.postsHeader}>Recent Posts</h4>
      <Cards
        posts={[
          {
            title: "Here is my First Blog and Why I Started Writing Blog Posts.",
            publishedOn: "01/11/2019",
            link: "/thispost",
            tag: "habits",
            thoughts: [
              { text: "Help document my thoughts & ideas" },
              { text: "To share my knowledge and perspective" },
              { text: "To learn to communicate" }
            ],
          },
          {
            title: "Here is my First Blog and Why I Started Writing Blog Posts.",
            publishedOn: "01/11/2019",
            link: "/thispost",
            tag: "habits",
            thoughts: [
              { text: "Help document my thoughts & ideas" },
              { text: "To share my knowledge and perspective" },
              { text: "To learn to communicate" }
            ],
          },
        ]}
      />
      <Button text="all posts >>" />
    </div>
  </Layout>
)
