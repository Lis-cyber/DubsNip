import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor,  primaryColor, primaryColorDarker, lightGray, secondaryColor } = colors;
// grayGreen,
export const CategoryStyle = styled.article` 
    margin: 20px auto;
    padding: 1em 0em 1em 0em;
    width: 21em;
    background: ${secondaryColor};
    border: solid 2px ${secondaryColor};
    border-radius: 10px;
    display: flex;
    flex-flow: column wrap;
    align-content: center;

    .inputConteiner {
        color: ${darkColor};
        background: ${lightGray};
        border-radius: 5px;
        height: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            background: ${secondaryColor};
        }
    }
    

    .input {
        background: ${lightGray};
        border: none;
        border-radius: 0 5px 5px 0;
        align-self: flex-end;
        width: 14em;
        height: 1.5em;
        margin: 5px;
        font-family: flamenco;
        font-size: 16px;
    }

    textarea {
        background: ${lightGray};
        border: none;
        border-radius: 5px;
        padding: 3px;
        align-self: flex-end;
        margin: 5px;
        resize: none;
        font-family: flamenco;
        font-size: 16px;
    }

    .btn {
        display:flex;
        justify-content:center;
    }

    .btnC {
        width: 8em;
        height: 2.3em;
        background: ${primaryColor};
        border: none;
        border-radius: 0.3em;
        color: white;
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin: 0.5em;

        &:hover {
            background: ${primaryColorDarker};
        }
    }

    label {
        color: white;
        font-size: 1.5em;
    }

`
