import axios from "axios";
import jwt from "jsonwebtoken";
import { cartGuestToUser } from "./cart";

export function loading() {
  return {
    type: "USER_STATUS_LOADING",
  };
}

export function failed() {
  return {
    type: "USER_STATUS_FAILED",
  };
}

export function idle() {
  return {
    type: "USER_STATUS_IDLE",
  };
}

export function completed() {
  return {
    type: "USER_STATUS_COMPLETED",
  };
}

export function addUser(newUser, cart) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post("/auth/register", newUser);
      dispatch(idle());
    } catch (error) {
      dispatch(failed());
      console.error(error);
    }
  };
}

export function deleteUser(userId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`/users/${userId}`);
      dispatch({ type: "DELETE_USER", payload: userId });
    } catch (error) {
      dispatch(failed());
      console.log(error);
    }
  };
}

export function setUser(user) {
  return { type: "SET_USER", payload: user };
}

export function getAllUsers() {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/users/`);
      dispatch({ type: "GET_ALL_USERS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch(failed());
    }
  };
}

export function logUser(values, cart) {
  return async (dispatch) => {
    dispatch(loading());

    try {
      const { data: token } = await axios.post(`/auth/login`, values);
      window.localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const user = jwt.decode(token);
      await dispatch(cartGuestToUser(user, cart));
      dispatch(setUser(user));
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function confirmEmail() {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put("/auth/confirmEmail");
      dispatch(idle());
    } catch (err) {
      console.log(err);
      dispatch(failed());
    }
  };
}

export function resetUserPassword(values, id, token) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const password = { password: values.password };
      await axios.post(`/users/${id}/passwordReset`, password, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(idle());
    } catch (err) {
      console.error(err);
      dispatch(failed());
    }
  };
}

export function searchByEmail({ email }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.get(`/users/email?email=${email}`);
      dispatch(idle());
    } catch (err) {
      console.error(err);
      dispatch(failed());
    }
  };
}

export function promoteUser(id, isAdmin) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.put(`/auth/promote/${id}`, {
        isAdmin,
      });
      dispatch({ type: "PROMOTE_USER", payload: { id, data } });
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  };
}

export function getUser() {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(`/auth/me`);
      dispatch({ type: "GET_USER", payload: data });
    } catch (err) {
      if (err.response) {
        dispatch(failed());
      }
    }
  };
}

// ----------------------------------------
export function sendEmailContact({ name, email, message }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post(`/users/emailContact`, {
        name,
        email,
        message,
      });
      dispatch(idle());
    } catch (err) {
      console.error(err);
      dispatch(failed());
    }
  };
}
