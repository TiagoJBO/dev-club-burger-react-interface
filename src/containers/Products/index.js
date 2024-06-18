import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import ProductsLogo from '../../assets/Products-logo.svg'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../Utils/formatCurrency'
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoryMenu,
  ProductsCantainer
} from './styles'

export function Products({ location: { state } }) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProducts] = useState([])
  const [activeCategory, setctiveCategories] = useState(categoryId)

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('Categories')

      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCategories(newCategories)
    }

    async function loadProducts() {
      const { data: allProducts } = await api.get('Products')

      const newProducts = allProducts.map((product) => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
    }
    loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProduct = products.filter(
        (product) => product.category_id === activeCategory
      )
      setFilteredProducts(newFilteredProduct)
    }
  }, [activeCategory, products])

  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="logo do produto" />
      <CategoryMenu>
        {categories &&
          categories.map((category) => (
            <CategoryButton
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setctiveCategories(category.id)
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoryMenu>

      <ProductsCantainer>
        {filteredProduct &&
          filteredProduct.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
      </ProductsCantainer>
    </Container>
  )
}
Products.propTypes = {
  location: PropTypes.object
}
