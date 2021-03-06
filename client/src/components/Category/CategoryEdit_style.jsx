import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor, grayGreen, primaryColor, primaryColorDarker, lightGray, secondaryColor } = colors;

export const CategoryEditStyle = styled.article ` 
    margin: 20px auto;
    padding: 1em 0em 1em 0em ;
    width: 21em;
    background: ${darkColor};
    color: ${grayGreen};
    border: solid 2px ${darkColor};
    border-radius: 10px;
    display: flex;
    flex-flow: column wrap;
    align-content: center;

    h3 {
        margin: 0.5em;
    }
    
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

    .btns {
        display: flex;
        justify-content: center
    }

    .btnC {
        width: 8.2em;
        height: 2.3em;
        background: ${primaryColor};
        border: none;
        border-radius: 0.3em;
        color: ${grayGreen};
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin: 0.5em;

        &:hover {
        background: ${primaryColorDarker};
        }
    }

    .btnR {
        width: 8.2em;
        height: 2.3em;
        background: ${darkColor};
        border: none;
        border-radius: 0.3em;
        color: ${grayGreen};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0.5em;
        top: 2px;
        border: 2px solid ${secondaryColor};
        &:hover {
        background: ${secondaryColor};
        }
    }

    label {
        font-size: 1.2em;
    }
`