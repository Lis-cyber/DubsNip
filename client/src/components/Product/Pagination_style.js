import { colors } from "../utils";
import styled from "styled-components";

const {
  darkColor,
  lightGray,
} = colors;
export const PaginationStyle = styled.ul`
  ul {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .divLi {
    margin-left: 0.6rem;

    button {
      text-decoration: none;
      padding: 0.26rem;
      color: ${darkColor};
      background: ${lightGray};
      border: 0.1rem solid ${darkColor};
      border-radius: 0.2rem;
      cursor: pointer;
      justify-content: center;
      align-items: center;
    }
  }
`;
