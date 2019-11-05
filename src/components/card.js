import React from "react"
import layout from "./layout.module.css"

const Thought = ({ text }) => <p className={layout.thought}>{text}</p>

const Post = ({ link, title, publishedOn, tag, idealist }) => (
  <a href={link} className={layout.card}>
    <div className={layout.upperCard}>
      <h4>{title}</h4>
      <div className={layout.postTags}>
        <span>{publishedOn}</span>
        <span>{tag}</span>
      </div>
    </div>
    <div className={layout.lowerCard}>
      {idealist.map(idea => (
        <Thought key={idealist.indexOf(idea)} text={idea} />
      ))}
    </div>
  </a>
)

export default ({ post }) => (
  <div className={layout.cards}>
    <Post
      link="http://"
      title={post.title}
      publishedOn={post.date}
      idealist={post.idealist}
      tag={post.tag}
    />
  </div>
)
