import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/actions/categories";
import { useHistory } from "react-router-dom";
import { CategoryStyle } from "./Category_style";
//
const Category = () => {
  const history = useHistory();
  const user = useSelector(({ users }) => users.user);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (!user?.isAdmin) history.replace("/");
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.description) {
      dispatch(addCategory(input));
      history.push("/categories");
    } else {
      alert("Both inputs are needed");
    }
  };

  return (
    <div>
      <CategoryStyle>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <div className="inputConteiner">
            <input
              onChange={handleChange}
              className="input"
              placeholder="Category name..."
              type="text"
              name="name"
              value={input.name}
            />
          </div>
          <label>Description</label>
          <div>
            <textarea
              cols="40"
              rows="4"
              onChange={handleChange}
              placeholder="Category description..."
              name="description"
              type="text"
              value={input.description}
            />
          </div>
          <div className="btn">
            <input type="submit" className="btnC" value="ADD Category" />
          </div>
        </form>
      </CategoryStyle>
    </div>
  );
};

export default Category;
