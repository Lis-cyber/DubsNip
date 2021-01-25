import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor, grayGreen } = colors;
// , primaryColor, primaryColorDarker
export const CategoryDe = styled.article`
display:flex;
margin-top: 3%;

.categoryDetail {
    display:flex;
    width: 60%;
    justify-content: center;
    flex-direction:row-reverse;
    background: ${grayGreen};
    border-radius: 1rem;
    padding: 2.5rem 0rem 2.5rem 0rem;
    margin-left: 20%;  
    img {
        display: flex;
        align-self: baseline;
        width: 98%
    }
}

.textDetail {
    width: 58%;
    display: flex;
    flex-direction: column
}

.desc {
    font-size: 1.2rem;
    margin: 1.5em;
    justify-content: space-between;
    padding: 1.5rem 0rem 1.5rem 0rem;
    background: ${darkColor};
    border-radius: 0.5rem;
    color: white;
    .st {
        margin: 0.5rem
    }
    
}



`