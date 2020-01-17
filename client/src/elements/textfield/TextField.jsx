import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './TextField.css'

class TextField extends Component{
  //TODO: notice the code can be shortened but is not because of future proofing
  constructor(props){
    super(props)
    this.setState = {
      err: '',
    }
  }

  handleChange = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  render() {
    const {
      placeholder = 'Input',
      isDisabled = false,
      type = 'text',
      className = '',
      value = '',
      length = 'default',
      error = '',
      name,
      ...other
    } = this.props

    return(
      <div className={styles.container}>
        <input
          {...other}
          type={type}
          className={styles.default}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={e => this.handleChange(e)}
          disabled={isDisabled}
        />
  
        {/* TODO: add an I con here */}
      </div>
    )
  }
}

export default TextField