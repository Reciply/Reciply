import React, { Component } from 'react'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'

import { checkPostCode, register, login } from '../../api/AuthenticationHelper'

import styles from './RegisterModal.css'

class RegisterModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      postCode: '',
      showRegister: false,
      postCodeErr: '',
      regEmail: '',
      regPwd: ''
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handlePostCodeCheck = () => {
    const { postCode } = this.state

    this.setState({showRegister: true})
    // const promise = new Promise((resolve, reject) => {
    //   checkPostCode(postCode, resolve, reject)
    // })
    // .then(res => {
    //   if (res.isValid){
    //     this.setState({showRegister: true})
    //   } else {
    //     this.setState({postCodeErr: 'Not a valid post code'})
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  handleRegister = () => {
    const { 
      regEmail,
      regPwd 
    } = this.state
    console.log("[DEBUG]: Register Button")
    
  }


  render(){
    const { 
      postCode,
      postCodeErr,
      regEmail,
      showRegister,
      regPwd
    } = this.state  

    if(showRegister) {
      return(
        <div className = {styles.modal}>
          <form className = {styles.regForm}>
            <TextField
              className={styles.regEmail}
              placeholder="Email"
              value={regEmail}
              onChange={value => this.handleChange('regEmail', value)}
            />
            <TextField
              className={styles.regPwd}
              type="password"
              placeholder="Password"
              value={regPwd}
              onChange={value => this.handleChange('regPwd', value)}
            />

            <Button
              className={styles.sbmtButton}
              type="submit"
              onClick={this.handleRegister}
            > 
              Register
            </Button>
          </form>
        </div>
      )
    } else {
      return (
      <div className={styles.modal}>
          <h4>Groceries Delivered to your door</h4>
          <TextField 
            name="postCode"
            className={styles.postCode}
            placeholder="Post Code"
            value={postCode}
            onChange={value => this.handleChange('postCode', value)}
          />
          <i>{postCodeErr}</i>
          <Button 
            className={styles.cntnBtn}
            onClick={this.handlePostCodeCheck}
          >
            Continue
          </Button> 
          <p>Already have an account?</p>
      </div>
      )
    }
  }
}

export default RegisterModal