import { colors } from "../utils";
import styled from "styled-components";
const { darkColor, grayGreen, primaryColor, primaryColorDarker, whitish } = colors;

export const CardBody = styled.article`
 margin: 20px auto;
  width: 200px;
  background: ${darkColor};
  color: ${grayGreen};
  border: solid 2px ${darkColor};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
 }

  a {
    color: ${grayGreen};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  .card_header {
    display: flex;
    justify-content: space-around;
    align-items: baseline;

    .admin_btns {
      display: flex;

      a {
        padding: 0 10px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .delete_btn {
    width: 20px;
    height: 20px;
    background: ${primaryColor};
    border: none;
    border-radius: 5px;
    color: ${grayGreen};
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: ${primaryColorDarker};
    }
  }

  .img_container {
    height: 175px;
    width: 175px;
    background: white;
    margin: 0 auto;
    border-radius: 10px;

    img {
      height: 175px;
      width: 175px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .card_disc{
    display: flex;
    margin: 10px 0px;
  }
  .prices{
    display: flex;
    justify-content: space-between
  }
  .disc_logo_cont{
    width: 2em;
    background-color: ${whitish};
    border-radius: 50%;
    display: flex;
    margin-right: 5px 
    /*align-content: center; */

  }
  .disclogo{
        width: 2em;
        margin-right: 5px;
      }
  .disc{
    font-size: 1.7em;
  }
  .card_info {
    text-align: left;
    font-size: 14px;
    padding: 0 10px 10px 15px;

    .stock {
      color: #e58306;
      font-size: 21px;
    }

    .card_price {
      padding: 8px 0;
      justify-self: flex-start;
    }
    .price_discount {
      padding: 8px 0;
      justify-self: flex-start;
      text-decoration:line-through;
    }
    .bottom_info {
      display: flex;
      justify-content: space-between;

      .card_description {
        width: 135px;
      }
      span {
        width: 30px;
        height: 30px;
        text-align: center;
        background: ${primaryColor};
        font-family: Arial, Helvetica, sans-serif;
        font-size: 24px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background: ${primaryColorDarker};
        }
      }
    }
`
