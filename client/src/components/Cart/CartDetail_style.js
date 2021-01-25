import styled from 'styled-components';
import { colors } from '../utils';
const {
  primaryColor,
  primaryColorDarker,
  darkGreen,
  darkColor,
  grayGreen,
  lightGreen,
  whitish,
} = colors;

export const CartDetailContainer = styled.section`
  margin: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${grayGreen};
  background: ${grayGreen};
  border-radius: 5px;
  padding: 10px;

  .products {
    width: 95vw;
    background: ${darkColor};
    border-radius: 5px;
    padding-bottom: 1vh;
    margin: 1rem;
    padding: 2rem;

    .product_line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 1px ${grayGreen};
      padding: 0 1vw;

      .product_name {
        font-size: 2rem;
      }

      .product_detail {
        display: flex;
        justify-content: space-between;
        width: 50vw;

        span {
          font-size: 1.1rem;
    
        }

        .product_btn {
          background: ${primaryColor};
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          color: ${whitish};
          cursor: pointer;
          margin: 0 1vw;

          &:hover {
            background: ${primaryColorDarker};
          }
        }
      }
    }
  }

  .finish {
    .total {
      font-size: 1.5rem;
      color: ${darkColor}
    }

    .btnB {
      margin-top: 1vh;
      color: ${whitish};
      font-size: 17px;
      width: 52px;
      height: 35px;
      padding: 5px 0;
      border: none;
      border-radius: 5px;
      background: ${lightGreen};
      cursor: pointer;

      &:hover {
        background: ${darkGreen};
      }
    }
  }

  a {
    text-decoration: none;
  }
  .btnBDiv {
  margin: 2vh 6vh 0vh 6vh;
  }

  .delet{
    display:flex;
    justify-content: flex-end;
    padding-bottom: 1rem

  }

  .btnDC{
      margin-top: 1vh;
      color: ${grayGreen};
      width: 80px;
      padding: 5px 0;
      border: none;
      border-radius: 5px;
      background: ${darkGreen};
      cursor: pointer;

      &:hover {
        background: ${lightGreen};
      }
    }
    
    h2 {
      color: ${darkColor}
    }

    .yourUser {
      margin-top: 1.5rem;
      font-size: 20px;
      background: ${primaryColor};
      color: ${whitish};
      padding: 6px;
      border-radius: 5px;
      p{
        margin: 3px;
      }
      .yes, .no{
      color: ${grayGreen};
      width: 35px;
      padding: 5px 0;
      border: none;
      border-radius: 5px;
      background: ${darkGreen};
      margin: 5px;
      cursor: pointer;
      &:hover {
        background: ${lightGreen};
      }
    }

    }
  
`;
