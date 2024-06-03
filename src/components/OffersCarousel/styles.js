import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 35px;
  padding: 35px 0;
  .rec.rec-arrow {
    background: #9758a6;
    color: #efefef;
  }
  .rec.rec-arrow:hover {
    border-radius: 50%;
    border: 2px solid #9758a6;
    background-color: #efefef;
    color: #9758a6;
  }
  .rec.rec-arrow:disabled {
    border: none;
    background-color: #bebebf;
    color: #efefef;
  }
`

export const CategoryImg = styled.img``

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 18px;
    font-weight: 700;
    line-height: 26.4px;
    text-align: left;
    color: #424242;
  }
`

export const Image = styled.img`
  width: 200px;
  border-radius: 10px;
`

export const Button = styled.button`
  margin-top: 16px;
  background: #9758a6;

  border-radius: 8px;

  height: 50px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  line-height: 100%;
  text-align: center;
  color: #ffffff;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
    &:active {
      opacity: 0.8;
    }
  }
`
