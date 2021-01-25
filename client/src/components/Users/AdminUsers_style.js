import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  primaryColor,
  primaryColorDarker,
  lightGray,
  lightGreen,
  darkGreen,
  whitish,
  ligthRed,
  darkRed
} = colors;

export const ListUsersBody = styled.article`
  margin: 2rem auto;
  width: 85%;
  background: ${lightGray};
  color: ${darkColor};
  border: solid 2px ${lightGray};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  padding: 2vh 0vh 5vh 0vh;

  h2 {
    padding: 0.5rem;
  }

  .usersCont {
    display: grid;
    grid-template-columns: repeat(4, 4fr);
    justify-content: space-around;
    align-content: center;
    margin: 0rem 1rem;
  }

  .users {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
    border: solid 2px ${darkColor};
    padding: 2vh;
    margin: 1.5vh;
  }


  p{
    display: flex;
    flex-direction: column;
    justify-content: flex-start
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

  .buttons{
    display: grid;
    grid-template-rows: repeat(2, auto);
    justify-content: center;
    
  }

  .b {
    background: ${primaryColor};
    color: ${whitish};
    height: 45px;
    width: 90px;
    margin: 1.5vh;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${primaryColorDarker};
    }
  }

  .bPA{
    background: ${lightGreen};
    color: ${whitish};
    height: 45px;
    width: 90px;
    margin: 1.5vh;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${darkGreen};
    }
  }

  .bPG{
    background: ${ligthRed};
    color: ${whitish};
    height: 45px;
    width: 90px;
    margin: 1.5vh;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${darkRed};
    }
  }
`;
