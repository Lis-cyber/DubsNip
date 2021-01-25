import axios from "axios";

export function loading() {
  return { type: "ORDER_STATUS_LOADING" };
}
export function failed() {
  return { type: "ORDER_STATUS_FAILED" };
}

export function completed(id, state) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/orders/${id}`, {
        state,
      });
      dispatch({ type: "ORDER_STATUS_COMPLETED", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}
export function cancelled(id, state) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/orders/${id}`, {
        state,
      });
      dispatch({ type: "ORDER_STATUS_CANCELLED", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function showUserOrder(userId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/users/${userId}/orders/detail`);
      dispatch({ type: "SHOW_USERS_ORDER", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function showOneOrder(userId, orderId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(
        `/users/${userId}/orders/detail/${orderId}`
      );
      dispatch({ type: "SHOW_ONE_ORDER", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function showAllOrders() {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/orders/`);
      dispatch({ type: "SHOW_ALL_ORDERS", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function showOrder(id) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/orders/${id}`);
      dispatch({ type: "SHOW_ORDER", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function shippingAddressOrder(orderId, payload, userId) {
  return async (dispatch) => {
    dispatch(loading());
    payload.state = "created";
    try {
      const check = await axios.put(`/orders/orderToPayment/${orderId}`);
      if (check.data === "ok") {
        const { data } = await axios.put(
          `/orders/shippingAddress/${orderId}`,
          payload
        );
        dispatch({ type: "SHIPPING_ADDRESS_ORDER", payload: data });
      }
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function showCartOrder(userId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/users/${userId}/order`);
      dispatch({ type: "SHOW_CART_ORDER", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function orderSuccess(id) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/orders/success/${id}`);
      dispatch({ type: "ORDER_SUCCESS", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}
