import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor, primaryColor, lightGray, secondaryColor } = colors
// primaryColorDarker, lightGray,

export const HomeStyle = styled.article`
background-color: ${lightGray};

img {
    width:100%
}

.btns {
    display: flex;
    justify-content: center;
}

.addP {
    margin: 2em;
    width: 8em;
    height: 2.5em;
    background: ${primaryColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    cursor: pointer;
    &:hover {
        background: ${darkColor};
    }
}

.cat {
    margin: 2em;
    width: 8em;
    height: 2.5em;
    background: ${darkColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    cursor: pointer;
    
    &:hover {
        background: ${secondaryColor};
    }
}

.addC {
    margin: 2em;
    width: 8em;
    height: 2.5em;
    background: ${secondaryColor};
    border: none;
    border-radius: 0.3em;
    color: white;
    cursor: pointer;
    
    &:hover {
        background: ${primaryColor};
    }
    
}
`
