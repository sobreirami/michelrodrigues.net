import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 32px;
    color: ${props => props.theme.colors.primary};
    margin-top: 40px;
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }
`

export const Card = styled.div`
  box-shadow: 0px 2px 8px 0px var(--clr-gray-light);
  background-color: white;
  text-align: center;
  border-radius: 1rem;
  position: relative;
  width: 360px;
  margin-bottom: 1rem;
  margin-left: 1rem;

  padding: 8px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  span {
    color: #121214;
  }

  div {

    margin-top: 32px;

    a {
      text-decoration: none;

      svg {
        width: 40px;
        height: 40px;
        color: #312e38;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    a + a::before {
      content: '';
      margin: 0 8px;
    }

  }

`;
