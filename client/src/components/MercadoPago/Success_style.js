import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  darkGreen,
  secondaryColor,
  grayGreen
} = colors;
export const SuccessStyle = styled.article`
  margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 75vh;
  background: ${grayGreen};
  border: solid 2px ${grayGreen};
  border-radius: 10px;
  /* display: flex;
  justify-content: center; */
  color: ${darkColor};
  font-size: 1.3em;

  .cont{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content:center
  }
  h3{
    margin-top: 0.3em; 
  }
  .info{
    margin: 0.7em;
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 60vh
  }
  p {
    display:flex;
    justify-content: flex-start;
    margin-top: 0.7em;    
  }
 
  button{
    width: 140px;
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
      border: 2px solid ${secondaryColor};
    }
  }

  `