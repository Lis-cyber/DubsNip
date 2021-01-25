import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  primaryColor,
  primaryColorDarker,
  lightGray,
  secondaryColor,
  whitish,
} = colors;
// grayGreen,

export const Wrong = styled.article`
margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 80vh;
  background: ${darkColor};
  border: solid 2px ${darkColor};
  color: ${whitish};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
h2{
  margin: 2em 2em 1em 2em;
 
}
.btnWrong{
  margin: 3em;
  width: 100px;
  height: 50px;
  background: ${primaryColor};
  border: none;
  border-radius: 0.3em;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: 0;
  &:hover {
    background: ${primaryColorDarker};
  }
}`
export const FormStyle = styled.article`
  margin: 20px auto;
  padding: 1em 0em 1em 0em;
  width: 21em;
  background: ${secondaryColor};
  border: solid 2px ${secondaryColor};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  align-content: center;

  h2 {
    color: #ffeaea;
    margin-bottom: 2vh;
  }
  a {
    text-decoration: none;
    color: ${whitish};
    margin-left: 9px;
    &:hover {
      color: ${darkColor};
    }
  }

  .inputConteiner {
    margin: 1vh;
    color: ${darkColor};
    background: ${lightGray};
    border-radius: 5px;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: ${secondaryColor};
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

  textarea {
    background: ${lightGray};
    border: none;
    border-radius: 5px;
    padding: 3px;
    align-self: flex-end;
    margin: 5px;
    resize: none;
    font-family: flamenco;
    font-size: 16px;
  }

  .btn {
    display: flex;
    justify-content: center;
  }

  .btnS {
    width: 5rem;
    height: 2rem;
    background: ${primaryColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0.5em;
    outline: 0;

    &:hover {
      background: ${primaryColorDarker};
    }
  }

  .labelIn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1vh 0;
  }

  label {
    color: white;
    font-size: 1rem;
    margin-left: 1vh;
  }
`;

export const GoogleButton = styled.div`
  background: #4285f4;
  width: 190px;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 14px;

  span {
    font-family: "Roboto", sans-serif;
    color: white;
    margin: 0 auto;
  }
  .logo {
    background: white;
    border: 1px solid #4285f4;
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px 0 0 3px;

    img {
      width: 20px;
    }
  }
  
`;
