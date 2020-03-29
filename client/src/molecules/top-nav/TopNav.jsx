import React, { Component } from 'react'

import styles from './TopNav.css'

class TopNav extends Component{
  render(){
    return(
      <div className={styles.}>
        <div className={styles.logo}> 
          Reciply
        </div>
      </div>
    )
  }
}

export default TopNav