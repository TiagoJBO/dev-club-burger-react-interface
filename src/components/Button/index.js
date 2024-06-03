import propTypes from 'prop-types'
import React from 'react'

import { ContainerButton } from './styles'

export function Button({ children, ...rest }) {
  return <ContainerButton {...rest}>{children} </ContainerButton>
}

Button.propTypes = {
  children: propTypes.string
}
