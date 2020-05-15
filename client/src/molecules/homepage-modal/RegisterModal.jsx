import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  register
} from '../../state/ducks/users/actions'

import TextField from '../../elements/textfield'
import Button from '../../elements/button'

//import { checkPostCode, register, login } from '../../api/AuthenticationHelper'

import styles from './RegisterModal.css'

class RegisterModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      postCode: '',
      showRegister: false,
      postCodeErr: '',
      regFirstName: '',
      regLastName: '',   
      regEmail: '',
      regPwd: '',
      regCnfrmPwd: '',
      regAddress: '',
      regError: '',
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
      regFirstName,
      regLastName,   
      regEmail,
      regPwd,
      regCnfrmPwd,
      regAddress,
    } = this.state 
    const {
      registerConnect
    } = this.props
    console.log("[DEBUG]: Handle register")
    const body = {
      'firstname': regFirstName,
      'lastname': regLastName,
      'email': regEmail,
      'password': regPwd, 
      'address': regAddress
    }
    registerConnect(body)

  }


  render(){
    const {
      showRegister,
      postCode,
      postCodeErr,
      regFirstName,
      regLastName,      
      regEmail,
      regPwd,
      regCnfrmPwd,
      regAddress
    } = this.state  
    if(showRegister) {
      return(
        <div className = {styles.modal}>
          <form className = {styles.regForm}>
            <TextField
              className={styles.regFirstName}
              type="name"
              placeholder="First Name"
              value={regFirstName}
              onChange={value => this.handleChange('regFirstName', value)}
            />
            <TextField
              className={styles.regLastName}
              type="name"
              placeholder="Last Name"
              value={regLastName}
              onChange={value => this.handleChange('regLastName', value)}
            />
            <TextField
              className={styles.regEmail}
              placeholder="Email"
              value={regEmail}
              onChange={value => this.handleChange('regEmail', value)}
            />
            <TextField
              className={styles.regPwd}
              placeholder="Password"
              type="password"
              value={regPwd}
              onChange={value => this.handleChange('regPwd', value)}
            />
            <TextField
              className={styles.regCnfrmPwd}
              placeholder="Password"
              type="password"
              value={regCnfrmPwd}
              onChange={value => this.handleChange('regCnfrmPwd', value)}
            />
            <TextField
              className={styles.regAddress}
              placeholder="246 Example Hwy, Burwood NSW"
              value={regAddress}
              onChange={value => this.handleChange('regAddress', value)}
            />

            <Button
              className={styles.sbmtButton}
              type="button"
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  registerConnect: register,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)