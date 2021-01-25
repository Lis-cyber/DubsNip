import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  primaryColor,
  primaryColorDarker,
  darkGreen,
  lightGray,
  secondaryColor,
  whitish,
  grayGreen
} = colors;
export const CheckStyle = styled.article`
  margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 75vh;
  background: ${primaryColor};
  border: solid 2px ${primaryColor};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  color: ${whitish};
  font-size: 1.3em;

  h2{
    margin: 0.5em
  }

  .labelIn, .textareaConteiner{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1vh 1vh;
  }

  .input {
    width: 72vh;
    border-radius: 6px;
    height: 40px;
    background-color:${lightGray};
    margin-top:1em;
    padding-left:10px;
    &:hover {
      cursor:pointer;
      border: solid 3px ${primaryColorDarker};
    }
    }
  .total{
    margin-top: 2em
  }
  .textarea{
    width: 72vh;
    border-radius: 8px;
    height: 80px;
    background-color:${lightGray};
    padding: 10px;
    &:hover {
      cursor:pointer;
      border: solid 3px ${primaryColorDarker};
    }
  }
  input:focus, textarea:focus {
    border: solid 3px ${primaryColorDarker};
  }
  input::placeholder{
    color: ${darkColor};
  }
  textarea::placeholder{
    color: ${darkColor};
    font-size: 15px;
  }

  .btnS{
    width: 100px;
    height: 60px;
    background: ${darkGreen};
    border: none;
    border-radius: 0.3em;
    color: ${grayGreen};
    font-size: 15px;
    cursor: pointer;
    margin: 1em;
    top: 2px;
    border: 2px solid ${darkGreen};
    &:hover {
      background: ${secondaryColor};
    }
  }

  // Contact --------------------->

  .inputMessage {
    height: 10rem;
    padding-top: 0.5rem;
  } 

  .labelMsg {
    margin: 1rem 0 1vh 0;
  }

`