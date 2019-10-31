import React from "react"
import layout from "./layout.module.css"

export default props => (
  <div className={layout.mainSection}>
    <div className={layout.upperSection}>
      <div className={layout.about}>
        <h2>About this Developer</h2>
        <p>Hello. Welcome to  my online space. 
            This is a repository of my thoughts, works, and beliefs.    
        I am a software developer from Nairobi, Kenya. 
        I am intrested in developing for the web.</p>
      </div>
      <div className={layout.quote}>
        {/* <a href='#'>Quote of the Day</a> */}
      </div>
    </div>
  </div>
)
