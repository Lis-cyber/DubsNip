import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, failed } from "../../redux/actions/categories";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CategoryEditStyle } from "./CategoryEdit_style";
import CategoryDetail from "./CategoryDetail";
import StyledError from ".././StyledComponents/StyledError";
const validationSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
});

const initialValues = {
  name: "",
  description: "",
};

const CategoryEdit = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const status = useSelector(({ categories }) => categories.status);
  const [showPage, setShowPage] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(editCategory(id, values));
      history.push(`/categories/`);
    },
  });

  useEffect(() => {
    if (!user?.isAdmin) history.replace("/");
    const getData = async () => {
      try {
        const { data } = await axios.get(`/products/category/detail/${id}`);
        formik.values.name = data.name;
        formik.values.description = data.description;
        setShowPage(true);
      } catch (err) {
        dispatch(failed());
        console.error(err);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "failed") return <StyledError />;

  if (showPage) {
    return (
      <>
        <CategoryDetail id={id} />
        <div className="categoryEdit">
          <CategoryEditStyle>
            <h3>Editing category: {id}</h3>
            <form onSubmit={formik.handleSubmit}>
              <label>Name</label>
              <div className="inputConteiner">
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Name..."
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <br />
              <label>Description</label>
              <div>
                <textarea
                  type="text"
                  cols="40"
                  rows="4"
                  name="description"
                  placeholder="Description..."
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>
              <br />
              <div className="btns">
                <input type="submit" className="btnC" value="Change Category" />
                <button className="btnR" onClick={formik.handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </CategoryEditStyle>
        </div>
      </>
    );
  } else return <h3>Loading...</h3>;
};

export default CategoryEdit;
