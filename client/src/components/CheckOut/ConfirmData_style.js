import { colors } from "../utils";
import styled from "styled-components";
const {
  lightGreen,
  darkGreen,
  lightGray,
  grayGreen,
  whitish,
  
} = colors;
export const ConData = styled.article`
  margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 95vh;
  background: ${darkGreen};
  border: solid 2px ${grayGreen};
  border-radius: 10px;
  /* display: flex;
  flex-flow: column wrap; */
  align-content: center;
  color: ${whitish};
  font-size: 1.3em;
  .prodList{
    margin: 0em 2em;
    border: solid 2px ${whitish};
    display: flex;
    justify-content: center;
    align-content: center;
    width: 85vh
  }
  .mercadopago-button {
    width: 30%;
    margin: 1rem auto;
    background: ${lightGray};
    color: ${darkGreen};
    cursor: pointer;
      &:hover {
        background: ${lightGreen};
      }
  }
  h3{
    text-decoration: underline;
    display: flex;
    margin: 1em 1em 0.2em 1em  
  }
  p, h4{
    display: flex;
    margin: 1em
  }
  li{
    display:flex
  }

  .orderData{
    margin: 1em
  }
`;
