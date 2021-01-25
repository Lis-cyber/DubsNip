import axios from "axios";

export function loading() {
  return { type: "CART_STATUS_LOADING" };
}

export function failed() {
  return { type: "CART_STATUS_FAILED" };
}

export function showCart(show) {
  return { type: "SHOW_CART", payload: show };
}

export function getCart(userId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(
        `/users/${userId}/cart`
      );
      dispatch({ type: "GET_CART", payload: data });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function changeQuantity(userId, quantity, productId) {
  return async (dispatch) => {
    try {
      
      const { data } = await axios.put(
        `/users/${userId}/cart`,
        {
          quantity,
          productId,
        }
      );
      const [changedProduct] = data.filter((el) => el.id === productId);
      dispatch({ type: "CHANGE_QUANTITY", payload: changedProduct });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function deleteCart(userId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/users/${userId}/cart`
      );
      dispatch({ type: "DELETE_CART", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
}

export function deleteProduct(userId, productId) {
  return async (dispatch) => {
    try {
      await axios.delete(
        `/users/${userId}/cart/${productId}`
      );
      dispatch({ type: "DELETE_PRODUCT_FROM_CART", payload: productId });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

export function addProductToCart(userId, productId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.post(
        `/users/${userId}/cart`,
        {
          productId,
        }
      );
      dispatch({ type: "ADD_PRODUCT_TO_CART", payload: data });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

/// Guest Cart:

//add product to Guest Cart from produc detail
export function addProductDetailGuest(payload) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let storageCartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
      let exists = false;
      payload = {
        ...payload,
        Order_Product: {
          quantity: 1,
        },
      };
      storageCartLS.forEach((e) => {
        if (e.id === payload.id) exists = true;
      });
      if (!exists) {
        storageCartLS.push(payload);
      }
      localStorage.setItem("cartLS", JSON.stringify(storageCartLS));
      dispatch({
        type: "ADD_PRODUCT_DETAIL_GUEST",
        payload: !exists ? payload : null,
      });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

//add product to Guest Cart from producCard / ProductList
export function addProductGuest(payload, id) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      if (id) {
        const { data } = await axios.get(
          `/products/${id}`
        );
        payload = data;
      }
      let cart = JSON.parse(localStorage.getItem("cartLS")) || [];
      // payload.Order_Product = {} && (payload.Order_Product.quantity = 1);
      payload = {
        ...payload,
        Order_Product: {
          quantity: 1,
        },
      };
      let exists = false;
      cart.forEach((e) => {
        if (e.id === id) exists = true;
      });
      if (!exists) {
        cart.push(payload);
      }
      localStorage.setItem("cartLS", JSON.stringify(cart));
      dispatch({
        type: "ADD_PRODUCT_GUEST",
        payload: !exists ? payload : null,
      });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

//delete product from Guest Cart Redux and Local Storage
export function deleteProductGuest(productId) {
  return async (dispatch) => {
    try {
      let storageCartLS = JSON.parse(localStorage.getItem("cartLS"));
      let cartLS = storageCartLS.filter((product) => product.id !== productId);
      localStorage.setItem("cartLS", JSON.stringify(cartLS));
      dispatch({ type: "DELETE_PRODUCT_GUEST", payload: cartLS && productId });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

//Change quantity from GuestCart/Redux
export function changeQuantityGuest(quantity, productId, product) {
  return async (dispatch) => {
    try {
      // const data = { quantity, productId };
      // product.Order_Product.quantity = quantity;
      product = {
        ...product,
        Order_Product: {
          quantity,
        },
      };
      dispatch({ type: "CHANGE_QUANTITY_GUEST", payload: product });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

//Change quantity from GuestCart/Local Storage
export function changeQGuestLS(quantity, productId) {
  return async (dispatch) => {
    try {
      let storageCartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
      let change = storageCartLS.map((e) => {
        if (e.id === productId)
          return (e = { ...e, Order_Product: { quantity } });
        else {
          return e;
        }
      });
      localStorage.setItem("cartLS", JSON.stringify(change));
      dispatch({ type: "CHANGE_Q_GUEST_LS", payload: change });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

//Get GuestCart
export function getGuestCart(payload) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let storageCartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
      dispatch({ type: "GET_GUEST_CART", payload: storageCartLS });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

//Delete all the GuestCart in CartDetail
export function deleteCartGuest() {
  return async (dispatch) => {
    dispatch(loading());
    try {
      dispatch({ type: "DELETE_CART_GUEST" });
      localStorage.removeItem("cartLS");
    } catch (err) {
      console.error(err);
    }
  };
}

//Pass GuestCart to UserCart when LogIn
export function cartGuestToUser(user, cart) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      for (const product of cart) {
        await axios.post(`/users/${user.id}/cart/guest`, {
          productId: product.id,
          quantity: product.Order_Product.quantity,
        });
      }
      localStorage.removeItem("location");
      //const cartLS = []
      localStorage.removeItem("cartLS");

      dispatch({ type: "CART_GUEST_TO_USER", cart });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}


//Delete the Redux Cart
export function deleteCartRedux() {
  return {  
  type: "DELETE_CART_REDUX"
  }

}