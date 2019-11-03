import React from "react"

import Layout from "../components/Layout"
import Cards from "../components/card"
import Button from "../components/button"
import layout from "./pages.module.css"

export default () => (
  <Layout>
    <div className={layout.social}>
      <span>
        <a
          href="https://www.linkedin.com/in/godfrey-wanjala-14601a73/"
          target="_blank"
          rel="noopener noreferrer"
          className={layout.linkedin}
        >
          linkedin
        </a>
      </span>
      <span>
        <a
          href="https://github.com/willeswa"
          target="_blank"
          rel="noopener noreferrer"
          className={layout.github}
        >
          github
        </a>
      </span>
      <span>
        <a
          href="https://twitter.com/wanjalake"
          target="_blank"
          rel="noopener noreferrer"
          className={layout.twitter}
        >
          twitter
        </a>
      </span>
    </div>
    <div>
      <h4 className={layout.postsHeader}>Recent Posts</h4>
      <Cards
        posts={[
          {
            title:
              "Here is my First Blog and Why I Started Writing Blog Posts.",
            publishedOn: "01/11/2019",
            link: "/thispost",
            tag: "habits",
            thoughts: [
              { text: "Help document my thoughts & ideas" },
              { text: "To share my knowledge and perspective" },
              { text: "To learn to communicate" },
            ],
          },
        ]}
      />
      <Button text="all posts >>" />
    </div>
  </Layout>
)
