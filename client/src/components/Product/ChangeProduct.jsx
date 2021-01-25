import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { ChangeProdForm } from "./ChangeProduct_style";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategoriesFromProduct,
  getProductById,
} from "../../redux/actions/products";
import { getCategories } from "../../redux/actions/categories";
import { CardDetail } from "./ProductDetail_style";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  price: Yup.number().positive(),
  discount: Yup.number(),
  stock: Yup.number().min(0),
  picture: Yup.string(),
});

const Product = ({
  match: {
    params: { id },
  },
}) => {
  const { replace } = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const categories = useSelector(({ categories }) => categories.categories);
  const product = useSelector(({ products }) => products.product);
  const status = useSelector(({ products }) => products.status);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductById(id));
    if (!user?.isAdmin) replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getProductById(id));
    }
  }, [status, dispatch, id]);

  if (status === "failed") return <h3>Couldn't find product.</h3>;
  if (status === "loading") return <h3>Loading...</h3>;

  return (
    <Formik
      initialValues={{
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        picture: product.picture,
        checks: product.categories
          ? product.categories.map((category) => category.name)
          : product.categories,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, e) => {
        let obj = {
          ...values,
          id,
        };
        dispatch(editCategoriesFromProduct(obj));
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <CardDetail>
            <div className="productDetail">
              <div className="textDetail">
                <div className="title">
                  {" "}
                  <h1>{product.name}</h1>{" "}
                </div>
                <h3>PRICE: $ {product.price}</h3>
                <div className={product.discount ? "descDis" : "desc"}>
                  {product.discount ? <p> DISCOUNT: % {product.discount}</p> : <></>}
                  <p>DESCRIPTION: {product.description}</p>
                  <div className="st">
                    <p>STOCK: {product.stock}</p>
                  </div>
                  <p>
                    CATEGORIES:{" "}
                    {product.categories &&
                      product.categories.map((name) => {
                        return name.name + ", ";
                      })}
                  </p>
                </div>
              </div>
              <div className="img">
                {" "}
                <img src={product.picture} alt="" />
              </div>
            </div>
          </CardDetail>
          <ChangeProdForm>
            <label>Name</label>
            <div className="inputConteiner">
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="Name..."
                value={values.name}
              />
              {touched.name && errors.name ? <div>{errors.name}</div> : null}
            </div>
            <label>Description</label>
            <div className="textareaConteiner">
              <Field
                component="textarea"
                type="text"
                name="description"
                placeholder="Description..."
                className="textarea"
              />

              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <label>Price</label>
            <div className="inputConteiner">
              <Field
                type="number"
                name="price"
                className="input"
                placeholder="Price..."
              />
            </div>
            {touched.price && errors.price ? <div>{errors.price}</div> : null}

            <label>% Discount</label>
            <div className="inputConteiner">
              <Field
                type="number"
                name="discount"
                className="input"
                placeholder="% of discount..."
              />
            </div>
            {touched.discount && errors.discount ? <div>{errors.discount}</div> : null}

            <label>Stock</label>
            <div className="inputConteiner">
              <Field
                type="number"
                name="stock"
                className="input"
                placeholder="Stock..."
              />
              {touched.stock && errors.stock ? <div>{errors.stock}</div> : null}
            </div>
            <label>Picture</label>
            <div className="inputConteiner">
              <Field
                type="text"
                name="picture"
                className="input"
                placeholder="Picture..."
              />
              {touched.picture && errors.picture ? (
                <div>{errors.picture}</div>
              ) : null}
            </div>
            <div>
              <label className="c">Categories</label>
              <div>
                {categories.map((category, i) => {
                  return (
                    <div className="cat">
                      <label>
                        <Field
                          type="checkbox"
                          name="checks"
                          value={category.name}
                        />
                      </label>
                      <label className="catcheck" key={i}>
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="btns">
              <button className="btnC" type="submit">
                Edit Product
              </button>
            </div>
          </ChangeProdForm>
        </Form>
      )}
    </Formik>
  );
};

export default Product;
