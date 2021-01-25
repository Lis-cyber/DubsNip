import { colors } from '../utils';
import styled from 'styled-components';
const { primaryColor, primaryColorDarker } = colors;

export const ReviewStyle = styled.article` 
  display: flex;
  flex-flow: column wrap;
  align-content: center;

  .btnR {
    display: flex;
    flex-flow: column wrap;
    align-content: center;
    justify-content: center;
    width: 8em;
    height: 2.3em;
    background: ${primaryColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    cursor: pointer;
    margin: 0.5em;

    &:hover {
        background: ${primaryColorDarker};
    }
  }


`