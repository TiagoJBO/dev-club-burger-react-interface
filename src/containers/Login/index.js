import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import LoginImg from '../../assets/loginImage.svg'
import Logo from '../../assets/logoBurger.svg'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SigninLink
} from './styles'

export function Login() {
  const history = useHistory()

  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email valido')
      .required('O   email é obrigatorio'),
    password: Yup.string()
      .required('A senha Obrigado')
      .min(6, 'A senha precisa ter pelo menos 6 digitos')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seu dados!',
        success: 'Seja bem vidno(a).',
        error: 'Verifique seu email ou senha e tente novamente'
      }
    )

    putUserData(data)

    setTimeout(() => {
      if (data.admin) {
        history.push('/pedidos')
      } else {
        history.push('/')
      }
    }, 1000)
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-imagen" />
      <ContainerItens>
        <img src={Logo} alt="logo-dev -burger" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label> Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Entrar
          </Button>
        </form>

        <SigninLink>
          Não possui conta?{' '}
          <Link style={{ color: 'white' }} to="/cadastro">
            Cadastre-se
          </Link>
        </SigninLink>
      </ContainerItens>
    </Container>
  )
}
