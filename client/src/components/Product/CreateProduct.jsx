import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { CreateProduct } from "./CreateProduct_style";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/products";
import { getCategories } from "../../redux/actions/categories";
import StyledLoading from ".././StyledComponents/StyledLoading";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().positive(),
  discount: Yup.number(),
  stock: Yup.number().min(0).required("Required"),
  picture: Yup.string().required("Required"),
});

const AddProduct = () => {
  const user = useSelector(({ users }) => users.user);
  const categorias = useSelector(({ categories }) => categories.categories);
  const status = useSelector(({ categories }) => categories.status);
  const dispatch = useDispatch();
  const { push, replace } = useHistory();

  useEffect(() => {
    if (!user?.isAdmin) replace("/");
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (status === "loading") return <StyledLoading />;
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        picture: "",
        checks: [],
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        // alert(JSON.stringify(values, null, 2));
        dispatch(addProduct(values));
        push(`/products/`);
      }}
    >
      {({ values, errors, touched }) => (
        <CreateProduct>
          <Form>
            <label>Name</label>
            <div className="inputConteiner">
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="Name..."
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
            {touched.discount && errors.discount ? (
              <div>{errors.pridiscountce}</div>
            ) : null}

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
              <label>Categories</label>
              <div className="">
                {categorias.map((category, i) => {
                  return (
                    <div className="cat" key={i}>
                      <label>
                        <Field
                          type="checkbox"
                          name="checks"
                          value={category.name}
                        />
                      </label>
                      <label className="catcheck">{category.name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="btnAdd">
              <button className="btnA" type="submit">
                Add Product
              </button>
            </div>
          </Form>
        </CreateProduct>
      )}
    </Formik>
  );
};

export default AddProduct;
