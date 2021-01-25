import styled from "styled-components";
import { colors } from "../utils";

const { lightGray, lightGreen, primaryColor, grayGreen, primaryColorDarker } = colors;

export const TeamStyle = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2rem 3rem 2rem 3rem;
  }

  .flip-card {
    background-color: transparent;
    width: 200px;
    height: 200px;
    margin: 15px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    border-top-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  .flip-card-front {
    background-color: ${lightGray};
    color: black;
    display: flex;
    margin: auto;
    align-items: center;
    h4 {
      font-size: 1.4rem;
      margin: 0.2rem;
    }
    img {
      margin: 1.5rem 1rem 1rem 1.2rem;
      width: 6rem;
      height: 6rem;
    }
  }

  .flip-card-back {
    background-color: ${lightGreen};
    justify-content: space-between;
    padding: 1rem;
    color: white;
    transform: rotateY(180deg);
    font-size: 1.5rem;

    .inside {
      margin: auto;
      h5 {
        margin-top: 0.8rem;
      }
    }
    .contact {
      a {
        margin: 0.2rem;
      }
    }
    img {
      width: 2rem;
      margin-top: 1rem;
    }
      button {
      width: 6em;
      height: 3.5em;
      background: ${primaryColor};
      border: none;
      border-radius: 0.3em;
      color: ${grayGreen};
      margin: 3.5rem 2rem;
      cursor: pointer;
      &:hover {
          background: ${primaryColorDarker};
      }
    }
  }

  .JoinUs {
    font-size: 2rem;
  }

  // Hay que modificar esto para que sea responsive
  // @media screen and (max-width: 60rem){
  //   .container{
  //     background: black;
  //     margin-bottom: 30px;
  //   }
  // }
`;
