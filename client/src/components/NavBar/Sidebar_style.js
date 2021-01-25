import styled from "styled-components";
import { colors } from "../utils";
const { darkColor, lightGreen, darkGreen, lightGray } = colors;

export const SidebarContainer = styled.div`
  .close_container {
    width: 100vw;
    height: 100vh;
    display: block;
    z-index: 2;
    position: fixed;
    left: -110%;
    top: 0;
    opacity: 0;
  }

  .close_container.active {
    left: 0;
  }

  .side_menu {
    font-family: "Lato", sans-serif;
    position: fixed;
    z-index: 3;
    height: 100vh;
    background: ${darkGreen};
    min-width: 200px;
    width: 20vw;
    color: ${lightGray};
    left: -100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 500ms ease-in-out;

    .profile_btn {
      margin: 1rem auto;
    }

    a {
      width: 80%;
      padding: 1rem;
      border-radius: 5px;
      text-decoration: none;
      color: ${lightGray};
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &:hover {
        background: ${lightGreen};
        color: ${darkColor};
      }

      span {
        padding-left: 0.5vw;
      }
    }

    ul {
      height: 100%;
      padding: 1.4rem 0 10vh 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      list-style: none;

      .close_btn {
        align-self: flex-start;
        margin-left: 2rem;
        width: max-content;
        cursor: pointer;
      }

      li {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 2rem;
      }
    }
  }

  .side_menu.active {
    left: 0;
    transition: 350ms ease-in-out;
  }
`;
