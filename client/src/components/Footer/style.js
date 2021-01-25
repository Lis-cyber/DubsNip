import styled from "styled-components";
import { colors } from "../utils";
const { primaryColorDarker, lightGreen, whitish } = colors;

export const FooterStyle = styled.article`

  .footerbox {
    background: linear-gradient(
      180deg,
      rgba(241, 243, 245, 1) 35%,
      rgba(238, 241, 245, 1) 60%,
      rgba(209, 211, 214, 1) 100%
    );
    display: flex;
    //position: absolute;
    min-width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 0.4rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a {
      display: flex;
      justify-content: flex-start;
      text-decoration: none;
      margin: 0.4rem;
      margin-top: 1vh;
      button {
        color: ${whitish};
        font-size: 15px;
        width: 100px;
        height: 55px;
        padding: 5px 0;
        border: none;
        border-radius: 5px;
        background: ${lightGreen};
        cursor: pointer;
        &:hover {
          background: ${primaryColorDarker};
        }
      }
    }
  }

  .footerinfo2 {
    text-align: center;
  }

  .adv {
    text-align: center;
    font-size: smaller;
  }
`;
