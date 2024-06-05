import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { ErrorMessageStyles } from '../../../components/ErrorMessage/styles'
import Api from '../../../services/api'
import { Container, Label, Input, Buttonstyles, LabelUploads } from './styles'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { push } = useHistory()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed()
      .test('required', 'Carregue um arquivo', (value) => {
        return value?.length > 0
      })
      .test('fileSize', 'Carregue arquivo de até 2mb', (value) => {
        return value[0]?.size <= 200000
      })
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data) => {
    const productDataFormData = new FormData()
    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])

    await toast.promise(Api.post('products', productDataFormData), {
      pending: 'Criando novo produto...',
      success: 'Produto criado com sucesso ',
      error: 'Falha ao criar o produto'
    })
    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await Api.get('categories')

      setCategories(data)
    }
    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessageStyles>{errors.name?.message}</ErrorMessageStyles>
        </div>

        <div>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessageStyles>{errors.price?.message}</ErrorMessageStyles>
        </div>

        <div>
          <LabelUploads>
            {fileName || (
              <>
                <CloudUploadIcon /> Carregue a imagem do produto
              </>
            )}
            <input
              type="file"
              accept="image/png. image/jpeg"
              {...register('file')}
              onChange={(value) => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUploads>
          <ErrorMessageStyles>{errors.file?.message}</ErrorMessageStyles>
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder="Categorias"
                />
              )
            }}
          ></Controller>
          <ErrorMessageStyles>{errors.category?.message}</ErrorMessageStyles>
        </div>

        <Buttonstyles>Adicionar produtos</Buttonstyles>
      </form>
    </Container>
  )
}
export default NewProduct
