import { colors } from "../utils";
import styled from "styled-components";
const { grayGreen, whitish, darkColor } = colors;

export const OrderDetailBody = styled.article`
  margin: 20px auto;
  padding-bottom: 2rem;
  width: 100vh;
  background: ${darkColor};
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
    justify-content: center;
  }
  .desc {
    width: 5rem;
    margin: 2rem 1rem 0rem 1rem;
    display: flex;
    justify-content: center;
  }

  .info {
    font-size: 1.2rem;
    margin: 1.2rem;
  }

  .detail {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1rem;
  }

  .detailP {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
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
`;
