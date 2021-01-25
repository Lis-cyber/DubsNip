import React, { useEffect, useState } from "react";
import { showAllOrders } from "../../redux/actions/order";
import { useSelector, useDispatch } from "react-redux";
import { OrdersBody } from "./AdminOrders_style";
import StyledLoading from "../StyledComponents/StyledLoading";
import { Link } from "react-router-dom";
const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(({ order }) => order.order);
  const [state, setState] = useState("all");
  const [input, setInput] = useState();

  useEffect(() => {
    dispatch(showAllOrders());
  }, [dispatch]);

  if (orders && orders.length > 0) {
    return (
      <OrdersBody>
        <div style={{ background: "#393841" }}>
          <h2 className="ordersH2">Orders</h2>
        </div>
        <div className="logicContainer">
          <div className="dropdown">
            <button className="dropbtn">Filter State:</button>
            <div className="dropdown-content">
              <button className="buttonState" onClick={() => setState("all")}>
                All Orders
              </button>
              <button
                className="buttonState"
                onClick={() => setState("created")}
              >
                Created
              </button>
              <button
                className="buttonState"
                onClick={() => setState("paid")}
              >
                Paid
              </button>
              <button
                className="buttonState"
                onClick={() => setState("cancelled")}
              >
                Cancelled
              </button>
              <button
                className="buttonState"
                onClick={() => setState("completed")}
              >
                Completed
              </button>
            </div>
          </div>
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="number"
                placeholder="User ID..."
                className="inputDescription"
                onChange={(e) => {
                  if (e.target.value === "") setState("all");
                  else setState(null);
                  setInput(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
        <div className="grid-container">
          <div className="orderIdContainer">
            <div className="orderTitles">Order ID</div>
            {orders.map((order, i) =>
              state === null ? (
                parseInt(input) === order.userId ? (
                  <div className="orderInfo" key={i}>
                    {order.id}
                  </div>
                ) : null
              ) : state === "all" ? (
                <div className="orderInfo" key={i}>
                  {order.id}
                </div>
              ) : state === order.state ? (
                <div className="orderInfo" key={i}>
                  {order.id}
                </div>
              ) : null
            )}
          </div>
          <div className="dateContainer">
            <div className="orderTitles">Date</div>
            {orders.map((order, i) =>
              state === null ? (
                parseInt(input) === order.userId ? (
                  <div className="orderInfo" key={i}>
                    {order.createdAt}
                  </div>
                ) : null
              ) : state === "all" ? (
                <div className="orderInfo" key={i}>
                  {order.createdAt}
                </div>
              ) : state === order.state ? (
                <div className="orderInfo" key={i}>
                  {order.createdAt}
                </div>
              ) : null
            )}
          </div>
          <div className="userIdContainer">
            <div className="orderTitles">User ID</div>
            {orders.map((order, i) =>
              state === null ? (
                parseInt(input) === order.userId ? (
                  <div className="orderInfo" key={i}>
                    {order.userId}
                  </div>
                ) : null
              ) : state === "all" ? (
                <div className="orderInfo" key={i}>
                  {order.userId}
                </div>
              ) : state === order.state ? (
                <div className="orderInfo" key={i}>
                  {order.userId}
                </div>
              ) : null
            )}
          </div>
          <div className="statusContainer">
            <div className="orderTitles">Status</div>
            {orders.map((order, i) =>
              state === null ? (
                parseInt(input) === order.userId ? (
                  <div className="orderInfo" key={i}>
                    {order.state}
                  </div>
                ) : null
              ) : state === "all" ? (
                <div className="orderInfo" key={i}>
                  {order.state}
                </div>
              ) : state === order.state ? (
                <div className="orderInfo" key={i}>
                  {order.state}
                </div>
              ) : null
            )}
          </div>
          <div className="functionContainer">
            <div className="orderTitles">Link to Order</div>
            {orders.map((order, i) =>
              state === null ? (
                parseInt(input) === order.userId ? (
                  <div className="orderInfo" key={i}>
                    <Link to={`/admin-order/${order.id}`}>
                      <button className="b">Open Order</button>
                    </Link>
                  </div>
                ) : null
              ) : state === "all" ? (
                <div className="orderInfo" key={i}>
                  <Link to={`/admin-order/${order.id}`}>
                    <button className="b">Open Order</button>
                  </Link>
                </div>
              ) : state === order.state ? (
                <div className="orderInfo" key={i}>
                  <Link to={`/admin-order/${order.id}`}>
                    <button className="b">Open Order</button>
                  </Link>
                </div>
              ) : null
            )}
          </div>
        </div>
      </OrdersBody>
    );
  } else {
    return (
      <div>
        <StyledLoading />
      </div>
    );
  }
};

export default AdminOrders;