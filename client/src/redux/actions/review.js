import axios from "axios";

export function loading() {
  return { type: "REVIEW_STATUS_LOADING" };
}

export function failed() {
  return { type: "REVIEW_STATUS_FAILED" };
}

export function addedReview(productId, rating) {
  return { type: "DONE_REVIEW", payload: {productId, rating}};
}

export function getAllReviews(productId) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.get(
        `/product/${productId}/review`
      );
      dispatch({ type: "SHOW_ALL_REVIEWS", payload: data });
    } catch (err) {
      dispatch(failed());
      console.error(err);
    }
  };
}

export function addReview(productId, review) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { data } = await axios.post(
        `/product/${productId}/review`, 
        review
      )
      dispatch(addedReview(productId, review.rating))
      dispatch({ type: "ADD_REVIEW", payload: data});
    } catch (err) {
      dispatch(failed());
      console.error(err);
    };
  };
};

export function editReview(productId, idReview, review) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/product/${productId}/review/${idReview}`,
        review
      );
      dispatch({ type: "EDIT_REVIEW", payload: { idReview, data }});
    } catch (err) {
      dispatch(failed());
      console.error(err);
    };
  };
};

export function removeReview(productId, idReview) {
  return async (dispatch) => {
    try {
      dispatch(loading());
      await axios.delete(`/product/${productId}/review/${idReview}`);
      dispatch ({ type: "DELETE_REVIEW", payload: idReview});
    } catch (err) {
      dispatch(failed());
      console.log(err);
    }
  }
}