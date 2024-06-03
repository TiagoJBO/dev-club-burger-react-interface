import styled from 'styled-components'

import Background from '../../assets/backgroud.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  background: url(' ${Background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
  height: 90%;
`

export const ContainerItens = styled.div`
  background: #373737;
  height: 90%;
  border-radius: 0 10px 10px 0;
  padding: 25px 75px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  img {
    width: 260px;
    height: 94px;
    margin-top: 5px;
    margin-left: 55px;
  }
  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 75px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`

export const Label = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  text-align: left;
  color: #ffffff;
  margin-top: 28px;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 391.42px;
  height: 38.32px;
  border-radius: 5px;
  background: #ffffff;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  padding-left: 10px;
`

export const SigninLink = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  text-align: left;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;
    margin-bottom: 163px;
  }
`
export const ErrorMensage = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  text-align: left;
  color: #cc1717;
  margin-top: 5px;
`
