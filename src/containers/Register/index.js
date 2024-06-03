import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import RegisterImg from '../../assets/burgerRegister.svg'
import Logo from '../../assets/logoBurger.svg'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  SigninLink
} from './styles'

export function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigado'),
    email: Yup.string()
      .email('Digite um email valido')
      .required('O   email é obrigatorio'),
    password: Yup.string()
      .required('A senha Obrigado')
      .min(6, 'A senha precisa ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('A senha Obrigado')
      .min(6, 'A senha precisa ter pelo menos 6 digitos')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientData) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )
      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('email já cadastrado! Faça login para continuar.')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sitema!Tente novamente.')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-imagen" />
      <ContainerItens>
        <img src={Logo} alt="logo-dev -burger" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}> Nome</Label>
          <Input
            type="name"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <Label error={errors.email?.message}> Email</Label>
          <Input
            type="text"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <Label error={errors.confirmPassword?.message}>
            Confirme a senha
          </Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 7, marginBottom: 1 }}>
            Cadastrar
          </Button>
        </form>

        <SigninLink>
          Já possui conta?{' '}
          <Link style={{ color: 'white' }} to="/login">
            Logar
          </Link>
        </SigninLink>
      </ContainerItens>
    </Container>
  )
}
