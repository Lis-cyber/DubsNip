import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categories";
import { Link } from "react-router-dom";
import { Sidebar } from "./ProductList_style";

const ProductsSideBar = () => {
  const categories = useSelector(({categories}) => categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Sidebar>
      <h3>Categories</h3>
      <ul>
        {categories.map((category, i) => (
          <li key={i}>
            <Link to={`/products/category/${category.name}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  )
}

export default ProductsSideBar;