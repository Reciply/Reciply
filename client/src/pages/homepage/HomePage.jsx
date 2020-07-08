import React, { Component } from 'react'

import { connect } from 'react-redux'

import HomePageModal  from '../../molecules/homepage-modal'
import Button from '../../elements/button'
import { Redirect } from 'react-router-dom'

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
    const {
      loggedIn    
    } = this.props

    if(loggedIn) return <Redirect to={'/products'}/>

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
const mapStateToProps = state => ({
  loggedIn: state.users.isFetched
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)