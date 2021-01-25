import { colors } from "../utils";
import styled from "styled-components";
const { lightGray, darkColor } = colors;

export const MeStyles = styled.div`
  .userContainer {
    max-height: 90vh;
    height: fit-content;
    display: flex;
    flex-direction: column;
    height: 75vh;
  }

  .userInfo {
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    font-size: 1.5rem;
    border: 0.1rem solid ${darkColor};
    border-radius: 2rem;
    margin: 0.5rem;
    align-self: center;
    padding: 0.5rem;
    width: fit-content;
    background-color: ${lightGray};
  }
  .userPicture {
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    max-height: 10rem;
    max-width: 10rem;
    align-self: center;
    border-radius: 1.2rem;
  }
  .formulary {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }
`;
