import styled from 'styled-components'

import Background from '../../assets/backgroud.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background: url('${Background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RegisterImage = styled.img`
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
    width: 178px;
    height: 94px;
    margin: 5px 8px 3px 102px;
  }
  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    color: #ffffff;
    margin-bottom: 1px;
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
  margin-top: ${(props) => (props.error ? '12px' : '20px')};
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 391px;
  height: 38px;
  border-radius: 5px;
  background: #ffffff;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
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
    margin-bottom: 100px;
  }
`
