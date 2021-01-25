import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderBody } from "./style";
import { showUserOrder } from "../../redux/actions/order";

export default function Order() {
  const orders = useSelector(({ order }) => order.order);
  const user = useSelector(({ users }) => users.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUserOrder(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (orders && orders.length > 0) {
    return (
      <OrderBody>
        <div>
          <h3>All your Orders</h3>
          <ol className="orders">
            {orders.map((order, i) => {
              return (
                <li key={i}>
                  <div className="order">
                    <div className="order-descr">
                      <h3 className="">{order.id}</h3>
                      <p className="">{order.state}</p>
                      <p className="">{order.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className="">
                      <Link to={`/orderdetail/${order.id}`}>
                        <button className="b">Open Order</button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </OrderBody>
    );
  } else
    return (
      <OrderBody>
        <div>
          <h3>All your Orders</h3>
          <h4>You don't have any orders yet...</h4>
        </div>
      </OrderBody>
    );
}
