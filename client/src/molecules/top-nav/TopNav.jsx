import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  logout
} from '../../state/ducks/users/actions'

import Logo from '../../assets/Reciply_Logo.png'

import Button from '../../elements/button'

import styles from './TopNav.css'

class TopNav extends Component{

 
  render(){
    const {
      firstName,
      lastName,
      logoutConnect
    } = this.props

    return(
      <div className={styles.topnav}>
        <div>
          Reciply Logo
        </div>

        <div>
          Logged in as:<b> {`${firstName} ${lastName}`} </b>
        </div>
        <Button onClick={logoutConnect}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)