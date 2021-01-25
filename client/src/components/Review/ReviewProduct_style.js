import { colors } from "../utils";
import styled from "styled-components";
const {
  darkColor,
  lightGray,
} = colors;

export const ReviewCard = styled.div`
    margin: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${darkColor};
    color: white;
    font-size: 1.2rem;

    .date {
        color: ${lightGray}
    }

    // .container {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-around;
    // }
`;