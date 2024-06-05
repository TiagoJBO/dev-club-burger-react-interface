import CancelIcon from '@mui/icons-material/Cancel'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import path from '../../../constants/paths'
import api from '../../../services/api'
import FormatCurrency from '../../../Utils/formatCurrency'
import { Container, Img, IconEdit } from './styles'

function ListProducts() {
  const [products, setProducts] = useState()
  const { push } = useHistory()

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('products')

      setProducts(data)
    }
    loadOrders()
  }, [])

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckBoxIcon style={{ color: '#228822' }} />
    }
    return <CancelIcon style={{ color: '#CC1717' }} />
  }
  function editProduct(product) {
    push(path.EditProduct, { product })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="center">Produtos em Oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{FormatCurrency(product.price)}</TableCell>
                  <TableCell align="center">{isOffer(product.offer)}</TableCell>
                  <TableCell>
                    <Img src={product.url} alt="imagens-produto" />
                  </TableCell>
                  <TableCell>
                    <IconEdit onClick={() => editProduct(product)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
export default ListProducts
