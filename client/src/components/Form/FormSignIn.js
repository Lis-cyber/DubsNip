import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logUser, idle } from "../../redux/actions/users";
import { FormStyle, GoogleButton, Wrong } from "./FormSingup_style";
import { useHistory } from "react-router-dom";
import StyledLoading from "../StyledComponents/StyledLoading";
import googleLogo from "../../media/icons/google_logo.svg";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

export default function FormSignIn(props) {
  const dispatch = useDispatch();
  const userStatus = useSelector(({ users }) => users.status);
  const user = useSelector(({ users }) => users.user);
  const cartStatus = useSelector(({ cart }) => cart.status);
  const cart = useSelector(({ cart }) => cart.cart);
  const mailLocation = props.location.state;

  const { replace } = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  useEffect(() => {
    user && (mailLocation ? replace("/cartDetail") : replace("/"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, replace]);

  if (cartStatus === "loading" || userStatus === "loading")
    return <StyledLoading />;
  if (userStatus === "failed") {
    return (
      <Wrong>
        <h2>Something went wrong.</h2>
        <div>
          <button
            className="btnWrong"
            onClick={() => {
              dispatch(idle());
              replace("/login");
            }}
          >
            Try again
          </button>
        </div>
      </Wrong>
    );
  }
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(logUser(values, cart));
          //JSON.parse(localStorage.getItem('cartLS'))));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormStyle>
              <div>
                <h2> Log In </h2>
                <div className="labelIn">
                  <label>Email</label>
                  <div className="inputConteiner">
                    <Field
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email..."
                    />
                    {touched.email && errors.email ? <div>Required</div> : null}
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
                  <Link to="/login/resetPassword">
                    <p>Forgot password?</p>
                  </Link>
                </div>

                <div className="btn">
                  <button className="btnS" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </FormStyle>
          </Form>
        )}
      </Formik>
      <GoogleButton
        onClick={() => {
          window.location = `${process.env.REACT_APP_API}/auth/google`;
        }}
      >
        <div className="logo">
          <img alt="Google Icon" src={googleLogo}></img>
        </div>
        <span>Sign in with Google</span>
      </GoogleButton>
    </div>
  );
}
