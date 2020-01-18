import React, { Component } from 'react'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'

import styles from './RegisterModal.css'

class RegisterModal extends Component{
  render(){
    return(
      <div className={styles.modal}>
        <p>Groceries Delivered to your door</p>
        <TextField placeholder="Postcode" />
        <Button>Continue</Button> 
        <p>Already have an account?</p> 
      </div>
    )
  }
}

export default RegisterModal