import React from "react"

import Layout from "../components/Layout"
import Cards from "../components/card"
import Button from "../components/button"
import layout from "./pages.module.css"

export default () => (
  <Layout>
    <div className={layout.aboutron}>
      <img src="./images/prof.jpg" alt="profile pic" />
      <p>
        Hi. My name is Willies Wanjala. I am a software developer based in
        Nairobi Kenya. This is a repository of my thoughts, works, beliefs and a
        catalogue of my socially sharable daily habits.
      </p>
    </div>
    <div>
      <h4 className={layout.postsHeader}>RECENT POSTS</h4>
      <Cards
        posts={[
          {
            title: "First Blog and Why?",
            publishedOn: "01/11/2019",
            link: "https://wilies.com/thispost",
            tag: "habits",
            thoughts: [{ text: "second thouht" }, { text: "second thouht" }],
          },
          {
            title: "First Blog and Why?",
            publishedOn: "01/11/2019",
            link: "https://wilies.com/thispost",
            tag: "philosophy",
            thoughts: [{ text: "second thouht" }, { text: "second thouht" }],
          },
          {
            title: "First Blog and Why?",
            publishedOn: "01/11/2019",
            link: "https://wilies.com/thispost",
            tag: "religion",
            thoughts: [{ text: "second thouht" }, { text: "second thouht" }],
          },
        ]}
      />
      <Button
      text="all posts >>"/>
    </div>
  </Layout>
)
