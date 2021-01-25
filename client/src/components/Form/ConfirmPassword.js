import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { FormStyle } from "./FormSingup_style";
import jwt from "jsonwebtoken";
import { resetUserPassword } from "../../redux/actions/users";
import { useHistory } from "react-router-dom";

const ConfirmPassword = (props) => {
  const dispatch = useDispatch();
  const token = props.match.params.token;
  const { replace } = useHistory();
  let status = true;
  const validationSchema = Yup.object({
    password: Yup.string().required("Required"),
    repeatPassword: Yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          repeatPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const user = jwt.decode(token);
          (values.password !== values.repeatPassword) ? status = false : status = true
          if (user?.id && status){
            await dispatch(resetUserPassword(values, user.id, token));
            replace("/login");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormStyle>
              <div>
                <h2> Recover Account </h2>
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

                <div className="labelIn">
                  <label>Repeat password</label>
                  <div className="inputConteiner">
                    <Field
                      name="repeatPassword"
                      type="password"
                      className="input"
                      placeholder="Repeat password..."
                    />
                    {touched.repeatPassword && errors.repeatPassword ? (
                      <div>{errors.repeatPassword}</div>
                    ) : null}
                  </div>
                </div>

                <div className="btn">
                  <button className="btnS" type="submit">
                    {" "}
                    Done!{" "}
                  </button>
                </div>
                <div>
                  {!status ? (<h4>The passwords doesn't match!</h4>) : null}
                </div>
              </div>
            </FormStyle>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ConfirmPassword;
