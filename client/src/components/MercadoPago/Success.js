import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartRedux } from "../../redux/actions/cart";
import { orderSuccess } from "../../redux/actions/order";
import { SuccessStyle } from "./Success_style";
import logo from "../../media/Logo-light-bkg.svg";
import { Link } from "react-router-dom";

export default function PaidSuccessfull(params) {
  const dispatch = useDispatch();
  const order = useSelector(({ order }) => order.one);
  const status = useSelector(({ order }) => order.status);
  const id = params.match.params.id;
  useEffect(() => {
    dispatch(orderSuccess(id));
    dispatch(deleteCartRedux());
  }, [dispatch, id]);

  if (status === "loading") return <h2>Loading...</h2>;
  if (order) {
    return (
      <SuccessStyle>
        <div>
          <img src={logo} alt="" />
          <div className="cont">
            <h3>Order n°: {order.id}</h3>
            <div className="info">
              <p>State: {order.state}</p>
              <p>
                Date: {order.updatedAt?.slice(0, 10)} -
                {order.updatedAt?.slice(11, 19)}
              </p>
              <p>Total: $ {order.total}</p>
              <p>PC: {order.postalCode}</p>
              <p>Shipping Address: {order.shippingAddress}</p>
            </div>
          </div>
          <div>
            <Link to="/user/orders">
              <button>My Shopping List</button>
            </Link>
          </div>
        </div>
      </SuccessStyle>
    );
  }
}
