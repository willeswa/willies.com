import React from "react"
import layout from "./layout.module.css"

const Thought = ({ text }) => <p className={layout.thought}>{text}</p>

export default ({ card }) => (
  <a href={card.link} className={layout.card}>
    <div className={layout.upperCard}>
      <h4>{card.title}</h4>
      <div className={layout.cardTags}>
        <span>{card.date}</span>
        <span>{card.tag}</span>
      </div>
    </div>
    <div className={layout.lowerCard}>
      {card.summaryPoints.map(idea => (
        <Thought key={card.summaryPoints.indexOf(idea)} text={idea} />
      ))}
    </div>
  </a>
)
