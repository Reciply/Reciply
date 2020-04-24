/**
 *
 * Default Button
 *
 * @version 1.0.0
 * @author Arvy Salazar
 */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';
// TODO: Some of this code can be shortened but is not because of future proofing
const Button = (props) =>{
  // The code is the way that it is for future proofing. 
  const {
    type = 'button',
    isDisabled = false,
    appearance = 'default',
    className,
    onClick,
    children
  } = props

  const classname = `${styles[appearance]} ${className || ''}`

  return(
    <button className={classname} onClick={onClick} type={type} disabled={isDisabled} >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  appearance: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button
