import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import layout from "./layout.module.css"
import pagecss from "../pages/pages.module.css"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            github
            linkedin
            twitter
          }
        }
      }
    `
  )

  return (
    <div>
      <nav className={pagecss.social}>
        <span>
          <a
            href={data.site.siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={pagecss.linkedin}
          >
            linkedin
          </a>
        </span>
        <span>
          <a
            href={data.site.siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className={pagecss.github}
          >
            github
          </a>
        </span>
        <span>
          <a
            href={data.site.siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={pagecss.twitter}
          >
            twitter
          </a>
        </span>
      </nav>
      <main className={layout.container}>{children}</main>
      <footer className={layout.container}>
        <p>
          Design inspired by: <a href="https://deepstash.com/">deepstash.com</a>
        </p>
      </footer>
    </div>
  )
}
