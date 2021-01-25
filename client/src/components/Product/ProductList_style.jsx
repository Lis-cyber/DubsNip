import styled from "styled-components";
import { colors } from "../utils";
const { darkGreen, lightGreen, grayGreen } = colors;

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: 90vh;
`;
export const Catalogue = styled.section`
  width: 85vw;

  .cards {
    display: grid;
    grid-template-columns: repeat(4, auto);
  }
`;
export const Sidebar = styled.section`
  background: ${lightGreen};
  width: 15vw;
  text-align: left;
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: ${grayGreen};
  }
  ul {
    list-style: none;
  }
  li {
    padding: 0.5rem;
  }
  a {
    color: ${grayGreen};
    text-decoration: none;
    background: ${darkGreen};
    border-radius: 5px;
    padding: 3px 5px;
    &:hover {
      color: ${darkGreen};
      background: ${grayGreen};
    }
  }
`;
