import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteCartRedux } from "../../redux/actions/cart";

export default function FailurePaid() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteCartRedux());
  }, [dispatch]);

  return <div></div>;
}
