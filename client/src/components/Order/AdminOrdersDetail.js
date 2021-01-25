import React from "react";
import { OrderDetailBody } from "./AdminOrderDetail_style";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  showOrder,
  completed,
  cancelled,
} from "../../redux/actions/order";

export default function ODetail(id) {
  const order = useSelector(({ order }) => order.one);
  const status = useSelector(({ order }) => order.status);
  const dispatch = useDispatch();
  const idO = id.match.params.id;

  useEffect(() => {
    dispatch(showOrder(idO));
  }, [dispatch, idO]);

  const handleChange = (event) => {
    let orderStatus = event.target.value;
    if (orderStatus === "completed") {
      dispatch(completed(idO, orderStatus));
    } else if (orderStatus === "cancelled") {
      dispatch(cancelled(idO, orderStatus));
    }
  };

  if (status === "loading") return <h3>loading...</h3>;
  if (status === "failed") return <h1>failed...</h1>;
  if (order?.id) {
    return (
      <OrderDetailBody>
        <div>
          <h2>Order {order.id}</h2>
          <div className="orderCont">
            <div className="product_line">
              <div className="info">
                <p>State: {order.state}</p>
                {order.state === "paid" ? (
                  <select onChange={(e) => handleChange(e)}>
                    <option>{order.state}</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : null}
                <p>Date: {order.date}</p>
                <p>User: {order.userId} </p>
              </div>
            </div>
            <div className="description">
              <h4 className="desc">Product:</h4>
              <h4 className="desc">Quantity:</h4>
              <h4 className="desc">Price:</h4>
              <h4 className="desc">Subtotal:</h4>
            </div>
            <div className="product_line">
              <div className="detail">
                <ol>
                  {order.products.map((product, i) => {
                    const { quantity, price } = product.Order_Product;
                    return (
                      <li key={i}>
                        <div className="detail">
                          <h4 className="product_name">{product.name}</h4>
                          <div className="detailP">
                            <div className="quantity">{quantity}</div>
                            <div className="price"> ${price.toFixed(2)} </div>
                            <div className="subtotal">
                              ${(price * quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="finish">
              <span className="total">
                Total: $
                {order.products
                  .reduce(
                    (acc, curr) =>
                      acc +
                      curr.Order_Product.quantity * curr.Order_Product.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </OrderDetailBody>
    );
  } else return <h3>Loading...</h3>;
}
