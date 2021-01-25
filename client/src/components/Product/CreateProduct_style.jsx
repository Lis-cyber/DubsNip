import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  grayGreen,
  primaryColor,
  primaryColorDarker,
  lightGray,
  secondaryColor,
} = colors;

export const CreateProduct = styled.article`
  margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 21em;
  background: ${secondaryColor};
  color: ${grayGreen};
  border: solid 2px ${secondaryColor};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  align-content: center;

  .btnA {
    width: 90px;
    height: 40px;
    background: ${primaryColor};
    border: none;
    border-radius: 0.3rem;
    color: white;
    cursor: pointer;
    margin-top: 1.2rem ;

    &:hover {
      background: ${primaryColorDarker};
    }
  }

  .btnR {
    width: 8em;
    height: 2.3em;
    background: ${secondaryColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0.5em;
    top: 2px;
    border: 2px solid ${darkColor};
    &:hover {
      background: ${darkColor};
    }
  }

  .inputConteiner {
    color: ${darkColor};
    background: ${lightGray};
    border-radius: 5px;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2vh;
    &:hover {
      background: ${darkColor};
    }
  }
  .input {
    background: ${lightGray};
    border: none;
    border-radius: 0 5px 5px 0;
    align-self: flex-end;
    width: 14em;
    height: 1.5em;
    margin: 5px;
    font-family: flamenco;
    font-size: 16px;
  }

  .textareaConteiner {
    margin: 0.5vh;
    color: ${darkColor};
    background: ${lightGray};
    border-radius: 5px;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: ${secondaryColor};
    }
  }

  textarea {
    background: ${lightGray};
    border: none;
    border-radius: 5px;
    padding: 3px;
    align-self: flex-end;
    margin: 5px;
    resize: none;
    width: 14rem;
    font-family: flamenco;
    font-size: 16px;
  }

  .btns {
    display: flex;
    justify-content: center;
    margin: 5px;
  }

  label {
    font-size: 1.2em;
    color: white;
    margin-top: 1vh
  }
  .catcheck {
    margin-right: 0.2rem;
  }
  .cat {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    position: relative;
    left: -35%;
  }
`;
