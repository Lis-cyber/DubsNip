import { colors } from "../utils";
import styled from "styled-components";
const {
  lightGray,
  darkColor,
  reallyDarkColor,
  primaryColor,
  secondaryColor,
} = colors;

export const Container = styled.header`
  position: fixed;
  width: 100%;
  font-family: "Lato", sans-serif;
  padding: 2em;
  background-color: ${darkColor};
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  font-size: 0.8rem;

  .left_menu {
    display: flex;
    align-items: center;

    .ham_btn {
      color: ${lightGray};
      cursor: pointer;
    }

    .logo {
      margin-left: 20px;
    }
  }

  .menu {
    display: flex;
    padding-left: 20px;
    height: 75px;
    display: flex;
    align-items: center;

    .searchbar {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .menu_item {
      margin-left: 20px;

      span {
        padding: 5px 8px;
        border-radius: 5px;
        border: 2px solid ${darkColor};
      }
    }

    a {
      color: white;
      text-decoration: none;

      .active {
        background-color: ${primaryColor};
        &:hover {
          background-color: ${darkColor};
          border: 2px solid ${primaryColor};
        }
      }

      .sign_up {
        position: relative;
        top: 2px;
        border: 2px solid ${secondaryColor};
        &:hover {
          background: ${secondaryColor};
        }
      }
    }
  }

  .logo {
    height: 45px;
    width: auto;
  }

  .userDiv {
    display: flex;
    border-radius: 5px;
    border: 2px solid ${secondaryColor};
    background: ${reallyDarkColor};
    padding: 0.25rem;
    color: ${lightGray};
    justify-content: center;
    align-items: center;
  }
  .photoUser {
    margin-left: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
  }
`;

export const CartIcon = styled.div`
  /* position: relative; */
  cursor: pointer;
  position: relative;

  .cart_container {
    /* display: block; */
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  .cart_container.active {
    background: ${reallyDarkColor};
  }

  .cart {
    height: 20px;
    width: auto;
  }

  .quantity {
    position: absolute;
    width: 17px;
    bottom: 15px;
    left: 15px;
    height: 17px;
    z-index: 2;
    border-radius: 50%;
    background: ${primaryColor};
    color: #e8e8e8;
    font-family: Arial, Helvetica, sans-serif;
    /* font-weight: medium; */
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
