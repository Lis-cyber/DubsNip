import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor, grayGreen, primaryColor, primaryColorDarker, ligthRed } = colors;

export const CardDetail = styled.article`
display:flex;
margin-top: 3%;

.productDetail {
    display:flex;
    width: 90%;
    justify-content: center;
    flex-direction:row-reverse;
    background: ${grayGreen};
    border-radius: 1em;
    padding: 2.5em 0em 2.5em 0em;
    margin-left: 5%;  
    img {
        display: flex;
        align-self: baseline;
        width: 98%;
    }
}

.img {
    display: flex;
    width: 32%
}
.textDetail {
    width: 58%;
    display: flex;
    flex-direction: column
}

.desc {
    font-size: 1.2em;
    margin: 1.5em;
    justify-content: space-between;
    padding: 1.5em 0em 1.5em 0em;
    background: ${darkColor};
    border-radius: 0.5em;
    color: white;
    .st {
        margin: 0.5em
    }
}

.descDis {
    font-size: 1.2em;
    margin: 1.5em;
    justify-content: space-between;
    padding: 1.5em 0em 1.5em 0em;
    background: ${ligthRed};
    border-radius: 0.5em;
    color: white;
    .st {
        margin: 0.5em
    }

}

.add {
    width: 6em;
    height: 3.5em;
    background: ${primaryColor};
    border: none;
    border-radius: 0.3em;
    color: ${grayGreen};
    margin: 1rem 2rem;
    cursor: pointer;
    &:hover {
        background: ${primaryColorDarker};
    }
}

.allReviews {
    background: ${grayGreen};
    margin: 0 1rem 0 2rem;
    border-radius: 1em;
    border: 0.05rem solid #ddd;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 32rem;

}

.btn {
    display: flex;
    justify-content: center;
    
}
.price_discount{
    text-decoration:line-through;
}
.price{
    display: flex;
    justify-content: center
}

`

