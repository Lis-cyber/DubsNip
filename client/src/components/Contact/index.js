import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { CheckStyle } from "../CheckOut/CheckOut_style";
import { sendEmailContact } from "../../redux/actions/users";

const Index = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    message: Yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(sendEmailContact(values));
        }}
        // onSubmit={(values) => {
        //   dispatch(shippingAddressOrder(order.id, values));
        // }}
      >
        {({ errors, touched }) => (
          <Form>
            <CheckStyle>
              <div>
                <h2> Contact Us ! </h2>
                <div className="labelIn">
                  <label>Name</label>
                  <div className="inputConteiner">
                    <Field
                      name="name"
                      type="text"
                      className="input"
                      placeholder="Name..."
                    />
                  </div>
                  <label>Email</label>
                  <div className="inputConteiner">
                    <Field
                      name="email"
                      type="text"
                      className="input"
                      placeholder="Email..."
                    />
                    {touched.email && errors.email ? (
                      <div>{errors.email.replace("email", "This field")}</div>
                    ) : null}
                  </div>
                </div>
                <div className="labelIn labelMsg">
                  <label>Message</label>
                  <div>
                    <Field
                      name="message"
                      as="textarea"
                      type="text"
                      className="input inputMessage"
                      placeholder="Message..."
                    />
                    {touched.message && errors.message ? (
                      <div>{errors.message}</div>
                    ) : null}
                  </div>
                </div>
                <div className="btn">
                  <button className="btnS" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </CheckStyle>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;
