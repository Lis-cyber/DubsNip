import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FormStyle } from "./FormSingup_style";
import { searchByEmail } from "../../redux/actions/users";
import { CheckContainer } from "../Confirm/checkEmail";
import logo from "../../media/Logo-dark-bkg.svg";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const status = useSelector(({ users }) => users.status);
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
  });

  const emailSent = () => {
    return (
      <CheckContainer>
        <img src={logo} alt="DubsNip" onClick={() => replace("/")} />
        <article>
          <h2>We send you an email!</h2>
          <h3>Please check your email to continue with the procedure</h3>
        </article>
      </CheckContainer>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(searchByEmail(values));
        }}
      >
        {status === "idle" ? (
          <div>{emailSent()}</div>
        ) : (
          ({ errors, touched }) => (
            <Form>
              <FormStyle>
                <div>
                  <h2> Recover Account </h2>
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
                        <div>Required</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="btn">
                    <button className="btnS" type="submit">
                      {" "}
                      Send Email{" "}
                    </button>
                  </div>
                  <div>
                    {status === "failed" ? (
                      <h4>
                        An error ocurred! The email doesn't belong to any user..
                      </h4>
                    ) : (
                      <div style={{ color: "white" }}>
                        We'll send you an email to confirm your new password
                      </div>
                    )}
                  </div>
                </div>
              </FormStyle>
            </Form>
          )
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
