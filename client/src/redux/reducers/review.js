const initialState = {
  review: [],
  status: "idle",
  doneReviewProductId: [],
  rating: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REVIEW_STATUS_LOADING":
      return {
        ...state,
        status: "loading",
      };

    case "REVIEW_STATUS_FAILED":
      return {
        ...state,
        status: "failed",
      };

    case "SHOW_ALL_REVIEWS":
      return {
        ...state,
        review: action.payload,
        status: "idle",
      };

    case "ADD_REVIEW":
      return {
        ...state,
        review: [...state.review, action.payload],
        status: "idle",
      };

    case "EDIT_REVIEW":
      return {
        ...state,
        review: state.review.map((r) => {
          if (r.id === parseInt(action.payload.idReview)) {
            return action.payload.data[0];
          } else return r;
        }),
        rating: state.review.map((rat) => {
          if (rat.id === parseInt(action.payload.idReview)) {
            return  action.payload.data[0].rating;
          } else return Number(rat.rating)
        }),
        status: "edited",
      };

    case "DELETE_REVIEW":     
      return {
        ...state,
        review: state.review.filter((r) => r.id !== action.payload),
        rating: state.review.map((rat) => {
          if (rat.id !== parseInt(action.payload)) {
            return  Number(rat.rating);
          }
          else return null;
        }),
        // esto funciona para eliminar por cada una
        doneReviewProductId: state.review.map((rat) => {
          if (rat.id !== parseInt(action.payload)) {
            return  Number(rat.productId);
          }
          else return null;
        }),
        status: "deleted",
      };

    case "DONE_REVIEW":
      return {
        ...state,
        doneReviewProductId: state.doneReviewProductId.concat(
          Number(action.payload.productId)
        ),
        rating: state.rating.concat(Number(action.payload.rating)),
        status: "done",
      };

    default:
      return state;
  }
};

export default reviewReducer;