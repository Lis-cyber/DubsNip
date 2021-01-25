import { colors } from "../utils";
import styled from "styled-components";
const { darkColor, secondaryColor, whitish, darkGreen } = colors;

export const LastProductsStyle = styled.article`
  position: absolute;
  background-color: ${whitish};
  .mainContainer {
    display: grid;
    grid-template-rows: fit-content fit-content;
    grid-template-columns: 1fr;
    grid-template-areas:
      "pageTitle"
      "cards";
    .pageTitle {
      font-size: 2rem;
      grid-area: pageTitle;
      background-color: ${secondaryColor};
      display: flex;
      justify-content: center;
      border-radius: 1.5rem;
      margin-top: 0.15rem;
      .pageTitleTitle {
      }
    }

    .cards {
      grid-area: cards;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-top: 1rem;
    }
    .lastProductsContainer {
      grid-area: lastProducts;
      display: grid;
      grid-template-rows: 2rem 15rem 3rem 1rem 1rem;
      grid-template-columns: 15rem;
      grid-template-areas:
        "name "
        "picture"
        "description"
        "stock"
        "price";
      margin: 1rem;
      margin-right: 6rem;
      padding: 1rem;
      border-radius: 2rem;
      width: fit-content;
      height: fit-content;
      color: ${whitish};
      background-color: ${darkColor};
      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: name;
        font-size: 1.8rem;
      }
      .picture {
        grid-area: picture;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
      }
      .description {
        margin-top: 0.1rem;
        grid-area: description;
      }
      .price {
        grid-area: price;
      }
      .stock {
        grid-area: stock;
      }
    }
  }
  a {
    text-decoration: none;
    color: ${whitish};
  }
  a:hover {
    text-decoration: underline;
  }

  .ctaButton {
    margin-left: 0.5rem;
    font-family: "Lato", sans-serif;
    font-size: 12px;
    color: ${whitish};
    background-color: ${darkColor};
    padding: 0.5rem 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px ${darkGreen};
    border: 1px solid rgba(1, 1, 1, 0);
    &:hover {
      color: white;
      border: 1px solid white;
    }
    &:active {
      background-color: ${darkGreen};
      left: 2px;
      top: 2px;
    }
  }
`;
