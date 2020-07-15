import React, { Component } from 'react'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

class HomePageModal extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {
      showLogin = false
    } = this.props
    
    if(showLogin){
      return (<LoginModal/>) 
    } else {
      return (<RegisterModal/>)
    }
    
  }
}

export default HomePageModal