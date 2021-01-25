import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryById } from "../../redux/actions/categories";
import { CategoryDe } from "./CategoryDetail_style";
import StyledLoading from ".././StyledComponents/StyledLoading";
import StyledError from ".././StyledComponents/StyledError";
import { useHistory } from "react-router-dom";
// Este componente muestra el detalle de un producto
const CategoryDetail = ({ id }) => {
  const user = useSelector(({ users }) => users.user);
  const category = useSelector(({ categories }) => categories.category);
  const status = useSelector(({ categories }) => categories.status);
  const { replace } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.isAdmin) replace("/");
    dispatch(getCategoryById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <StyledLoading />;
  }

  if (status === "failed") {
    return <StyledError />;
  }

  return (
    <CategoryDe>
      <div className="categoryDetail">
        <div className="textDetail">
          <h1>Name: {category.name}</h1>
          <div className="desc">
            <p>Description: {category.description}</p>
          </div>
        </div>
      </div>
    </CategoryDe>
  );
};

export default CategoryDetail;
