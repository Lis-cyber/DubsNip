import styled from "styled-components";
import { colors } from "../utils";
const {
  primaryColor,
  primaryColorDarker,
  darkGreen,
  darkColor,
  grayGreen,
} = colors;

export const CartContainer = styled.section`
  position: fixed;
  width: 400px;
  right: 0;
  top: 75px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${grayGreen};
  background: ${darkColor};
  border-radius: 5px;
  padding: 10px;

  .cart_title {
    /* padding: 1rem; */
    align-self: flex-start;
    font-weight: normal;
    text-align: left;
    font-family: "Damion", cursive;
    font-size: 2rem;
    padding-bottom: 0.5rem;
  }

  .products {
    /* width: 70vw; */
    width: 385px;
    background: ${darkGreen};
    border-radius: 5px;
    padding-bottom: 0.5rem;

    .product_line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px ${grayGreen};
      padding: 0.2rem 0.8rem;

      .product_name {
        font-size: 2rem;
        width: 50%;
        text-align: left;
      }

      .product_detail {
        display: flex;
        justify-content: space-between;
        width: 100%;

        span {
          font-size: 1.1rem;
        }

        .product_btn {
          background: ${primaryColor};
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          color: ${grayGreen};
          cursor: pointer;
          margin: 0 0.3rem;

          &:hover {
            background: ${primaryColorDarker};
          }
        }
      }
    }
    .total {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      font-size: 1.1rem;
      padding: 10px 40px;
      .total_price {
        padding-left: 10px;
      }
    }
  }

  .finish {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem 0;

    a {
      text-decoration: none;
      font-family: "Lato", sans-serif;
      margin-top: 1vh;
      color: ${grayGreen};
      width: 50%;
      padding: 5px 0;
      border: none;
      border-radius: 5px;
      background: ${primaryColor};
      cursor: pointer;

      &:hover {
        background: ${primaryColorDarker};
      }
    }
  }
`
