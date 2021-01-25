import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchbarContainer } from "./SearchBar_style";

const SearchBar = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    //redirecciona a search/:keyword
    if (search) {
      history.push(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <SearchbarContainer>
      <form onSubmit={(e) => handleSearch(e)}>
        <input className="search_btn" type="submit" value=" " />
        <input
          className="search_input"
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </SearchbarContainer>
  );
};

export default SearchBar;
