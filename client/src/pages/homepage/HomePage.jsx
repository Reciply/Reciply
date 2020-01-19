import React, { Component } from 'react'

import LoginModal from '../../molecules/login-modal'
import RegisterModal from '../../molecules/register-modal'
import Button from '../../elements/button'

import HomePageImage from '../../assets/homepage_image.png'

import styles from './HomePage.css'

class HomePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      showLogin: false, //true is register and false is login 
      email: '',
      password:'',
    }   
  }

  loginBtn = {

  }

  render(){

    // Show RegisterModal by default
    const {showLogin} = this.state
    let homePageModal =  <RegisterModal/>
    
    if (showLogin){
      homePageModal = <LoginModal/>
    } 
    
    //TODO: Remember to do validation
    return(
      <div className={styles.outer}>
        <div className={styles.modalContainer}>
          <header>
            <Button className={styles.loginBtn}>Login</Button> 
          </header>
          {/* <Button>Login</Button> */}
          {homePageModal}
        </div>
      </div>
    )
  }
}

export default HomePage