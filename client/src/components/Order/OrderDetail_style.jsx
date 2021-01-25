import { colors } from "../utils";
import styled from "styled-components";
const { lightGreen, grayGreen, whitish, lightGray, darkColor } = colors;

export const OrderBody = styled.article`
  margin: 20px auto;
  padding-bottom: 2rem;
  width: 100vh;
  background: ${lightGreen};
  color: ${whitish};
  border-radius: 10px;
  display: flex;
  justify-content: center;

  h2 {
    margin-top: 0.7rem;
  }
  .orderCont {
    border: solid 1px ${grayGreen};
    border-radius: 10px;
    width: 80vh;
  }

  .description {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10rem;
    margin-left: 3rem;

    justify-content: space-evenly;
    //justify-content: center;
  }
  .desc {
    width: 5rem;
    margin: 2rem 0rem 0rem 0rem;
    display: flex;
  }
  .P {
    margin-left: 5rem;
  }
  .Q {
    margin-left: 4rem;
  }
  .Pri {
    margin-left: 4rem;
  }
  .S {
    margin-left: 4rem;
  }
  .R {
    margin-left: 4rem;
  }

  .info {
    font-size: 1.2rem;
    margin: 1rem;
  }

  .detail {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1rem 0rem;
  }

  .detailP {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.7rem;
  }

  .finish {
    font-size: 1.7rem;
    margin: 2rem;
  }

  .product_line {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px ${grayGreen};
    padding: 0 1vw;
  }

  .product_name,
  .quantity,
  .price,
  .subtotal {
    width: 5rem;
    margin: 0rem 1rem;
    display: flex;
    justify-content: center;
  }
  // Reviews ------------------------->

  .reviews {
    display: flex;
    max-width: 10rem;
    align-items: center;
    h4 {
      margin: 0.3rem;
    }
  }
  .addReviewBtn {
    display: inline-block;
    width: 4rem;
    min-width: 9rem;
    height: 1.5rem;
    background: ${lightGray};
    border: none;
    border-radius: 0.3em;
    color: ${darkColor};
    font-size: 0.6rem;
    cursor: pointer;
    &:hover {
      background: ${darkColor};
      color: ${grayGreen};
    }
  }
  .editOrRemoveReviewBtn {
    display: inline-block;
    width: 1.2rem;
    margin: 0.2rem;
    height: 1.2rem;
    background: ${lightGray};
    border: none;
    border-radius: 0.3em;
    color: ${darkColor};
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background: ${darkColor};
      color: ${grayGreen};
    }
  }

`;
