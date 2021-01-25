import React, { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../../redux/actions/categories";
import { useSelector, useDispatch } from "react-redux";
import StyledLoading from ".././StyledComponents/StyledLoading";
import StyledError from ".././StyledComponents/StyledError";
import { CategoryL } from "./CategoryList_style";
import { useHistory } from "react-router-dom";
// Este componente muestra todos los productos
const CategoryList = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const categories = useSelector(({ categories }) => categories.categories);
  const status = useSelector(({ categories }) => categories.status);
  const { replace } = useHistory();

  useEffect(() => {
    if (!user?.isAdmin) replace("/");
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <StyledLoading />;
  }

  if (status === "failed" || categories.length < 1) {
    return <StyledError />;
  }

  return (
    <CategoryL>
      <h2>Categories</h2>
      <div className="categories">
        {categories.map((category, i) => (
          <CategoryCard
            key={i}
            id={category.id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </CategoryL>
  );
};

export default CategoryList;
