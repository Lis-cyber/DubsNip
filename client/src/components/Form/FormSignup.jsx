import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addUser, idle } from "../../redux/actions/users";
import { FormStyle, GoogleButton } from "./FormSingup_style";
import { useHistory } from "react-router-dom";
import googleLogo from "../../media/icons/google_logo.svg";
import dotenv from "dotenv";
dotenv.config();

export default function FormSignUp(props) {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const validationSchema = Yup.object({
    givenName: Yup.string().required("Required"),
    email: Yup.string().email().required(),
    password: Yup.string().required("Required"),
  });
  const status = useSelector(({ users }) => users.status);
  const user = useSelector(({ users }) => users.user);
  const cart = useSelector(({ cart }) => cart.cart);

  const mailLocation = props.location.state;
  useEffect(() => {
    if (user && status === "completed" && !mailLocation) {
      replace("/products");
      dispatch(idle());
    }
    if (user && status === "completed" && mailLocation) {
      replace("/cartDetail");
      dispatch(idle());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div>
      <Formik
        initialValues={{
          givenName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(addUser(values, cart));
          replace("/check-email");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormStyle>
              <div>
                <h2> Join us! </h2>
                <div className="labelIn">
                  <label>Name</label>
                  <div className="inputConteiner">
                    <Field
                      name="givenName"
                      type="text"
                      className="input"
                      placeholder="Name..."
                    />
                    {touched.givenName && errors.givenName ? (
                      <div>{errors.givenName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="labelIn">
                  <label>Email</label>
                  <div className="inputConteiner">
                    <Field
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email..."
                    />
                    {touched.email && errors.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="labelIn">
                  <label>Password</label>
                  <div className="inputConteiner">
                    <Field
                      name="password"
                      type="password"
                      className="input"
                      placeholder="Password..."
                    />
                    {touched.password && errors.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="btn">
                  <button className="btnS" type="submit">
                    Sign up
                  </button>
                </div>
                <div>
                  {status === "failed" ? (
                    <h4>An error ocurred! Try with another email..</h4>
                  ) : null}
                </div>
              </div>
            </FormStyle>
          </Form>
        )}
      </Formik>
      <GoogleButton
        onClick={() =>
          (window.location = `${process.env.REACT_APP_API}/auth/google`)
        }
      >
        <div className="logo">
          <img alt="Google Icon" src={googleLogo}></img>
        </div>
        <span>Sign up with Google</span>
      </GoogleButton>
    </div>
  );
}
