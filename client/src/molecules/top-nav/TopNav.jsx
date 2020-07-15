import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  logout
} from '../../state/ducks/users/actions'
import {
  clearCart
} from '../../state/ducks/shopCart/actions'

import Logo from '../../assets/Reciply_Logo.png'

import Button from '../../elements/button'

import styles from './TopNav.css'

class TopNav extends Component{

  handleLogout = () =>{
    const{
      logoutConnect,
      clearCartConnect
    } = this.props
    //delete token and empty the cart
    clearCartConnect()
    logoutConnect() 
  }

 
  render(){
    const {
      firstName,
      lastName
    } = this.props

    return(
      <div className={styles.topnav}>
        <div>
          Reciply Logo
        </div>

        <div>
          Logged in as:<b> {`${firstName} ${lastName}`} </b>
        </div>
        <Button onClick={this.handleLogout}>
          Logout
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  firstName: state.users.firstname,
  lastName: state.users.lastname,
})

const mapDispatchToProps = {
  logoutConnect: logout,
  clearCartConnect: clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)