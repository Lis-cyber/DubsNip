import React from "react";
import styled from "styled-components";
import { colors } from "../utils";
import logo from "../../media/Logo-dark-bkg.svg";
const { lightGray, darkColor } = colors;

export const CheckContainer = styled.section`
  margin: 2rem auto;
  padding: 2rem;
  height: 80vh;
  width: 80vw;
  background: ${darkColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${lightGray};
  
  img {
    height: 20vh;
    width: 20vh;
    align-self: center;
    &:hover {
      cursor: pointer;
    }
  }

  h2 {
    margin-bottom: 1rem;
  }

`;

export default function CheckEmail() {
  return (
    <CheckContainer>
      <img src={logo} alt="DubsNip" />
      <article>
        <h2>One more step!</h2>
        <p>Please check the mail that we sent you</p>
      </article>
    </CheckContainer>
  );
}
