import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  primaryColor,
  primaryColorDarker,
  lightGray,
  whitish,
} = colors;

export const OrderBody = styled.article`
  margin: 2rem auto;
  width: 75%;
  background: ${lightGray};
  color: ${darkColor};
  border: solid 2px ${lightGray};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  padding: 2vh 0vh 2vh 0vh;

  h3 {
    padding: 0.5rem;
  }

  .orders {
    display: grid;
    grid-template-columns: repeat(5, auto);
    justify-content: space-around;
    margin: 0rem 1rem;
  }

  li {
    font-size: 1.2rem;
    border-width: 1px;
    border-style: dotted;
    border-color: ${darkColor};
    width: 9rem;
    margin: 1rem;
  }

  .order-descr {
    margin: 0.5rem 2rem;
  }

  .b {
    background: ${primaryColor};
    color: ${whitish};
    height: 30px;
    width: 80px;
    margin: 1.5vh;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${primaryColorDarker};
    }
  }
`;
