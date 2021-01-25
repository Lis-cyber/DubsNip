import { colors } from "../utils";
import styled from "styled-components";
const { darkColor } = colors;

export const CategoryL = styled.article`
  margin: 2rem;
  color: ${darkColor};

  h2 {
    text-decoration: underline;
  }

  .categories {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: space-around;
    margin: 1rem;
  }
`;
