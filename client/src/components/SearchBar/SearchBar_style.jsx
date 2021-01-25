import { colors } from '../utils';
import styled from 'styled-components';
import searchIcon from '../../media/icons/search.svg';
const { lightGray, darkColor } = colors

export const SearchbarContainer = styled.div`
  color: ${darkColor};
  background: ${lightGray};
  border-radius: 5px;
  width: 200px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search_btn {
    width: 25px;
    height: 25px;
    background: url(${searchIcon}) no-repeat center;
    background-size: 15px 15px;
    border: none;
    align-self: flex-start;
  }
  .search_input {
    background: ${lightGray};
    border: none;
    border-radius: 0 5px 5px 0;
    align-self: flex-end;
  }
`