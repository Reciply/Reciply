import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  login
} from '../../state/ducks/users/actions'

import { Redirect } from 'react-router-dom'
import Button from '../../elements/button'
import TextField from '../../elements/textfield'

import styles from './LoginModal.css'

class LoginModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      loginEmail: 'test@test.com',
      loginPassword: 'password'
    }
  }

  handleChange = (name, value) =>{
    this.setState({
      [name]: value,
    })
  }



  handleLogin = async () => {
    console.log("[DEBUG]: handleLogin")
    const { 
      loginEmail,
      loginPassword
    } = this.state

    const {
      loginConnect
    } = this.props
    
    //TODO: Validate login details

    //create an object called body with email and passwords
    const values = {
      'email': loginEmail,
      'password': loginPassword
    }
    const message = loginConnect(values)
    //Login requests
    // const promise = new Promise((resolve, reject) => {
    //   loginConnect(values, resolve, reject)
    // })
    // promise.then(() =>{
    //   console.log('success')
    // })
    // .catch(() => {
    //   console.log('fail')
    //   //TODO: error message
    // })
    //loginConnect()).then(() => console.log('[DEBUG]: success'))
    // let message = await loginConnect(values)
    // console.log('[DEBUG]: message - ' + message)
    // console.log("mesage: " + message)
    // if (message === 'success'){
    //   console.log('success')
    //   history.push('/products')
    // } else {
    //   console.log('error')
    // }

  }

  render(){
    const { 
      loginEmail,
      loginPassword
    } = this.state

    const {
      loggedIn 
    } = this.props 
    console.log('loggedIn' + loggedIn)
    if (loggedIn) {
      return <Redirect to={'/products'} />
    }
    return(
      <div className={styles.modal}>
        <form className={styles.loginForm}>
          <TextField
            name="loginEmail"
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={value => this.handleChange('loginEmail', value)}
          />    
          <TextField 
            name="loginPassword"
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={value => this.handleChange('loginPassword', value)}
          />
          <Button className={styles.loginBtn} onClick={this.handleLogin}>Login</Button>
        </form> 
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.users.isFetched,
})

const mapDispatchToProps = {
  loginConnect: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)