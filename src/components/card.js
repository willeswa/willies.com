import React from "react"
import layout from "./layout.module.css"

const Thought = props => <p className={layout.thought}>{props.text}</p>

const Post = props => (
  <a href={props.link} className={layout.card}>
    <div className={layout.upperCard}>
      <h4>{props.title}</h4>
      <div className={layout.postTags}>
        <span>{props.publishedOn}</span>
        <span>{props.tag}</span>
      </div>
    </div>
    <div className={layout.lowerCard}>
      {props.thoughts.map(thought => (
        <Thought text={thought.text} />
      ))}
    </div>
  </a>
)

export default props => (
    <div className={layout.cards}>
      {props.posts.map(post => (
        <Post
          link={post.link}
          title={post.title}
          publishedOn={post.publishedOn}
          thoughts={post.thoughts}
          tag={post.tag}
        />
      ))}
  </div>
)
