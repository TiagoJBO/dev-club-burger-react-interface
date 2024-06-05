/* eslint-disable no-unused-vars */
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import Cart from '../../assets/cart.png'
import Person from '../../assets/person.png'
import { useUser } from '../../hooks/UserContext'
import {
  Container,
  ContainerLeft,
  ContainerRight,
  PageLink,
  PageLinkExit,
  ContainerText,
  Line
} from './styles'

export function Header() {
  const {
    push,
    location: { pathname }
  } = useHistory()
  const { logout, userData } = useUser()

  const logoutUser = () => {
    logout()
    push('/login')
  }

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
          Home
        </PageLink>
        <PageLink
          onClick={() => push('/produtos')}
          isActive={pathname.includes('produtos')}
        >
          Ver produtos
        </PageLink>
      </ContainerLeft>

      <ContainerRight>
        <PageLink onClick={() => push('/carrinhos')}>
          <img src={Cart} alt="carrinho" />
        </PageLink>
        <Line></Line>
        <PageLink>
          <img src={Person} alt="logo-pessoa" />
        </PageLink>

        <ContainerText>
          <p>Óla, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>
  )
}
