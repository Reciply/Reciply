import React, { Component } from 'react'

import HomePageModal  from '../../molecules/homepage-modal'
import RegisterModal from '../../molecules/homepage-modal/RegisterModal'
import Button from '../../elements/button'
import ShopCart from '../../molecules/shop-cart'

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

  handleLoginBtn = () => {
    this.setState({
      showLogin: true
    })
  }



  render(){    
    //TODO: Remember to do validation

    const { showLogin } = this.state
    return(
      <div className={styles.outer}>
        <div className={styles.modalContainer}>
          <header>
            <Button onClick={this.handleLoginBtn} className={styles.loginBtn}>Login</Button> 
          </header>
          <HomePageModal showLogin={showLogin}/>
        </div>
      </div>
    )
  }
}

export default HomePage