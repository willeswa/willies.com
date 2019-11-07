import React from "react"
import layout from "./layout.module.css"

export default ({ link, text }) => (
  <a href={link} className={layout.button}>
    {text}
  </a>
)
