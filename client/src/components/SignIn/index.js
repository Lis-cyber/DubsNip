import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/users";
import { useHistory } from "react-router-dom";
import StyledLoading from "../StyledComponents/StyledLoading";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cartGuestToUser } from "../../redux/actions/cart";

export default function SignIn(props) {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const token = props.match.params.token;
  const cart = JSON.parse(window.localStorage.getItem("cartLS"));
  const location = JSON.parse(window.localStorage.getItem("location"));

  useEffect(() => {
    (async () => {
      const user = jwt.decode(token);
      if (!user?.id) replace("/error");
      else {
        window.localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await dispatch(cartGuestToUser(user, cart));
        await dispatch(setUser(user));
        location ? replace("/cartDetail") : replace("/");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledLoading />;
}
