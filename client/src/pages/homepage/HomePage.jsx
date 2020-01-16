import React, { Component } from 'react'

import Button from '../../elements/button'
import TextField from '../../elements/textfield'

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
        <form className={styles.loginForm}>
          <TextField type="email" placeholder="Email"/>
          <TextField type="password"/>
          <Button>Login</Button>
        </form> 
      </div>
    )
  }
}

export default HomePage