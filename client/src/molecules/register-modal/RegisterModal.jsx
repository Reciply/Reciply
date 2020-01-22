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
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handlePostCodeCheck = () => {
    console.log("this works")
    const { postCode } = this.state

    const promise = new Promise((resolve, reject) => {
      checkPostCode(postCode, resolve, reject)
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }


  render(){
    const { postCode } = this.state
    return(
      <div className={styles.modal}>
        <h4>Groceries Delivered to your door</h4>
        <TextField 
          name="postCode"
          className={styles.postCode}
          placeholder="Postcode"
          value={postCode}
          onChange={value => this.handleChange('postCode', value)}
        />
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

export default RegisterModal