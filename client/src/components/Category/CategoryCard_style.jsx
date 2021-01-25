import { colors } from '../utils';
import styled from 'styled-components';
const { darkColor, grayGreen, primaryColor, primaryColorDarker } = colors

export const CategoryBody = styled.article`
  margin: 1.5rem auto;
  width: 16rem;
  background: ${darkColor};
  color: ${grayGreen};
  border: solid 2px ${darkColor};
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;

  a {
    color: ${grayGreen};
    text-decoration: none;
  }

  .card_header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0rem 0.5rem 0.7rem 0.5rem;

    .admin_btns {
      display: flex; 
      justify-content: flex-end;
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
    font-size: 15px;
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

 
  .bottom_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin:0.2rem 0.5rem;
  }
  
  .card_description {
        width: 11rem;
        display: flex;
        justify-content: flex-start;
      }
  .btnInfo {
      display: flex;
      justify-content: center;
      width: 20px;
      height: 20px;
      text-align: center;
      align-items:center;
      background: ${primaryColor};
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      border-radius: 50%;
      &:hover {
        background: ${primaryColorDarker};
      }
    }
    
  
`