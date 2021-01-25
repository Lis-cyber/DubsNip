
import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { showCartOrder, shippingAddressOrder } from '../../redux/actions/order';
import { CheckStyle } from './CheckOut_style';



export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const order = useSelector(({ order }) => order.one);
  const cart = useSelector(({ cart }) => cart.cart);
  const totalCart = cart?.reduce((acc, curr) => {
    return acc + (curr.price - (curr?.discount * curr.price / 100))
    * curr.Order_Product.quantity;}, 0)
    .toFixed(2)
  
  
  const history = useHistory()
  const validationSchema = Yup.object({
    shippingAddress: Yup.string().required("Required"),
    postalCode: Yup.number().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    comments: Yup.string(),
  });


  useEffect(() => {
    dispatch(showCartOrder(user?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <Formik
        initialValues={{
          shippingAddress: "",
          postalCode: "",
          phoneNumber: "",
          comments: "",
          total: totalCart,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(shippingAddressOrder(order.id, values));
          history.push('/confirm-data')
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <CheckStyle>
              <div>
                <h2> Shipping Information </h2>
                <div className="labelIn">
                  <label>Shipping Address</label>
                  <div className="inputConteiner">
                    <Field
                      name="shippingAddress"
                      type="text"
                      className="input"
                      placeholder="Address, city and country..."
                    />
                    {touched.shippingAddress && errors.shippingAddress ? (
                      <div>{errors.shippingAddress}</div>
                    ) : null}
                  </div>

                </div>
                <div className="labelIn">
                  <label>Postal Code</label>
                  <div className="inputConteiner">
                    <Field
                      name="postalCode"
                      type="text"
                      className="input"
                      placeholder="Postal Code..."
                    />
                    {touched.postalCode && errors.postalCode ? (
                      <div>{errors.postalCode}</div>
                    ) : null}
                  </div>
                </div>

                <div className="labelIn">
                  <label>Phone Number</label>
                  <div className="inputConteiner">
                    <Field
                      name="phoneNumber"
                      type="text"
                      className="input"
                      placeholder="Phone Number..."
                    />
                    {touched.phoneNumber && errors.phoneNumber ? (
                      <div>{errors.phoneNumber}</div>
                    ) : null}
                  </div>
                </div>
                <div className="textareaConteiner">
                  <label>Comments</label>
                  <Field
                    component="textarea"
                    type="text"
                    name="comments"
                    placeholder="Comments..."
                    className="textarea"
                  />
                  {touched.comments && errors.comments ? (
                    <div>{errors.comments}</div>
                    ) : null}
                    <label className="total">Total Price:  {totalCart}</label>
                </div>
                <div className="btn">
                  <button className="btnS" type="submit">
                    Continue to Payment
                  </button>
                </div>
                {/* <div> 
               { status === "failed" ? <h4>An error ocurred! Try again..</h4> : null }
              </div> */}
              </div>
            </CheckStyle>
          </Form>
        )}
      </Formik>
    </div>
  );
}
