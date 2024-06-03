import React from 'react'

import homeBurgerLogo from '../../assets/home page burger logo.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import { Container, HomeImg } from './styles'

export function Home() {
  return (
    <Container>
      <HomeImg src={homeBurgerLogo} alt="logo-home" />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}
