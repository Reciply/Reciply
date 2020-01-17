import React, { Component } from 'react'

import LoginModal from '../../molecules/login-modal'
import HomePageImage from '../../assets/homepage_image.png'

import styles from './HomePage.css'

class HomePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password:''
    }   
  }

  render(){
    return(
      <div className={styles.outer}>
        <div>Navbar</div>
        <div>
          <LoginModal/>
        </div>
        <img src={HomePageImage}/>
      </div>
    )
  }
}

export default HomePage