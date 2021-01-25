import { colors } from "../utils";
import styled from "styled-components";
const { darkColor, darkGreen, whitish, lightGreen } = colors;

export const OrdersBody = styled.article`
  .grid-container {
    height: fit-content;
    display: grid;
    grid-template-rows: repeat(auto-fit, auto);
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "orderIdTitle dateTitle userIdTitle statusTitle linkToOrderTitle";
  }

  .ordersH2 {
    height: fit-content;
    color: #0d1117;
    background-color: #ffffff;
    border: 0.2rem solid ${darkColor};
    border-radius: 1rem;
  }
  .orderTitles {
    margin-top: 0.3rem;
    font-size: 1.6rem;
    margin-bottom: 1.3rem;
    background-color: ${darkColor};
    padding: 0.7rem;
    border-radius: 1rem;
    color: ${whitish};
  }
  .orderIdContainer {
    grid-area: orderIdTitle;
  }
  .dateContainer {
    grid-area: dateTitle;
  }
  .userIdContainer {
    grid-area: userIdTitle;
  }
  .statusContainer {
    grid-area: statusTitle;
  }
  .functionContainer {
    grid-area: linkToOrderTitle;
  }
  .orderInfo {
    color: ${darkColor};
    margin-bottom: 1.2rem;
    background: #ffffff;
    font-size: 1.4rem;
    background-color: ${darkGreen};
    color: ${whitish};
    padding-bottom: 0.3rem;
  }

  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .btnChangeState {
    }
  }

  .dropbtn {
    background-color: ${darkColor};
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 2rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: flex;
    width: fit-content;
  }
  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 100%;
    .buttonState {
      width: 100%;
      background: ${whitish};
      align-items: center;
    }
  }
  /* Links inside the dropdown */
  .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  /* Change color of dropdown links on hover */
  .dropdown-content button:hover {
    background-color: ${darkGreen};
  }
  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }
  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }

  .logicContainer {
    display: flex;
    justify-content: space-evenly;
    align-items: center
  }

  .inputDescription {
    height: 2rem;
    width: 6rem;
    margin-left: 1rem;
    border-radius: 0.5rem;
    padding-left: 1.9rem
  }

  .b {
    background: ${darkGreen};
    color: ${whitish};
    width: 90px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: ${lightGreen};
    }
  }
}
`
