import React from "react"
import layout from "./layout.module.css"

const Thought = ({text}) => <p className={layout.thought}>{text}</p>

const Post = ({link, title, publishedOn, tag, thoughts}) => (
  <a href={link} className={layout.card}>
    <div className={layout.upperCard}>
      <h4>{title}</h4>
      <div className={layout.postTags}>
        <span>{publishedOn}</span>
        <span>{tag}</span>
      </div>
    </div>
    <div className={layout.lowerCard}>
      {thoughts.map(thought => (
        <Thought key={thoughts.indexOf(thought)} text={thought.text} />
      ))}
    </div>
  </a>
)

export default ({posts}) => (
    <div className={layout.cards}>
      {posts.map(post => (
        <Post
          key={posts.indexOf(post)}
          link={post.link}
          title={post.title}
          publishedOn={post.publishedOn}
          thoughts={post.thoughts}
          tag={post.tag}
        />
      ))}
  </div>
)
