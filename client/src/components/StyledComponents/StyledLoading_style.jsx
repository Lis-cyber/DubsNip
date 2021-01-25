import styled from "styled-components";
import { colors } from "../utils";
const { lightGray, darkGreen } = colors;
export const LoadingStyle = styled.section`
  * {
    margin: 0;
    padding: 0;
  }
  .loading-screen {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    width: 80px;
    display: flex;
    flex-wrap: wrap;
    animation: rotate 1.5s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
  .loading span {
    width: 32px;
    height: 32px;
    background-color: red;
    margin: 4px;
    animation: scale 1.5s linear infinite;
  }

  @keyframes scale {
    50% {
      transform: scale(1.2);
    }
  }

  .loading span:nth-child(1) {
    border-radius: 50% 50% 0 50%;
    background-color: ${darkGreen};};
    transform-origin: bottom right;
  }
  .loading span:nth-child(2) {
    border-radius: 50% 50% 50% 0;
    transform-origin: bottom left;
    background-color: ${lightGray};
    animation-delay: 0.5s;
  }
  .loading span:nth-child(3) {
    border-radius: 50% 0 50% 50%;
    background-color: ${lightGray};
    transform-origin: top right;
    animation-delay: 1.5s;
  }
  .loading span:nth-child(4) {
    border-radius: 0 50% 50% 50%;
    background-color: ${darkGreen};
    transform-origin: top left;
    animation-delay: 1s;
  }
`;
