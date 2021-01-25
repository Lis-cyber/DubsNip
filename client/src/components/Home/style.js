import heroBkg from "../../media/imgs/hero_bkg.png";
import styled from "styled-components";
import { colors } from "../utils";
const { lightGreen, darkGreen, whitish, darkColor } = colors;

export const HomeContainer = styled.section`
  color: ${whitish};
  background: none;
  overflow: hidden;
  height: 90vh;

  .bkg {
    height: 90%;
    width: 100%;
    position: absolute;
    z-index: -1;
    background: url(${heroBkg}) no-repeat center right;
    background-size: cover;
    /* filter: blur(10px); */
  }
  .dark_blur {
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo_container {
      margin: 0 10vw 0 10vw;
    }

    .hero_txt {
      width: 30vw;
      text-align: left;
      /* margin-left: 5vw; */

      .title {
        line-height: 96%;
        padding-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        padding-bottom: 1rem;
      }

      a {
        text-decoration: none;
        .cta {
          font-family: "Lato", sans-serif;
          font-size: 12px;
          color: ${whitish};
          background-color: ${lightGreen};
          padding: 0.5rem 0.5rem;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 2px 2px ${darkGreen};
          border: 1px solid rgba(1, 1, 1, 0);

          &:hover {
            color: white;
            border: 1px solid white;
          }
          &:active {
            background-color: ${darkGreen};
            box-shadow: 2px 2px ${darkColor};
            left: 2px;
            top: 2px;
          }
        }
      }
    }
  }
  .ctaButton {
    margin-left: 0.5rem;
    font-family: "Lato", sans-serif;
    font-size: 12px;
    color: ${whitish};
    background-color: ${lightGreen};
    padding: 0.5rem 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px ${darkGreen};
    border: 1px solid rgba(1, 1, 1, 0);
    &:hover {
      color: white;
      border: 1px solid white;
    }
    &:active {
      background-color: ${darkGreen};
      box-shadow: 2px 2px ${darkColor};
      left: 2px;
      top: 2px;
    }
  }
`;
