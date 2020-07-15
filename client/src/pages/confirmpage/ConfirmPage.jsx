import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  logout
} from '../../state/ducks/users/actions'

import { Link } from 'react-router-dom'
import Button from '../../elements/button'
import { Redirect } from 'react-router-dom'
import TopNav from '../../molecules/top-nav'

import styles from './ConfirmPage.css'

class ConfirmPage extends Component{
  // handleLogout = () =>{
  //   const{
  //     logoutConnect
  //   } = this.props
  //   logoutConnect() 
  // }

  render(){
    const{
      logoutConnect,
      loggedIn
    } = this.props

    if(!loggedIn) return <Redirect to={'/'}/>

    return(
      <div className={styles.page}>
        <TopNav/>
        <div className={styles.pageMessage}>
         Your order has been sent. An email has been sent to your account email. Check the shops to buy more products or logout ?
        </div>
        <div className={styles.pageOptions}>
          <Link to="/products"><Button className={styles.goToProducts}> Go to Product List</Button></Link>
          <Button onClick={logoutConnect}> Logout </Button>
        </div>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  loggedIn: state.users.isFetched
})

const mapDispatchToProps = {
  logoutConnect: logout,
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage)