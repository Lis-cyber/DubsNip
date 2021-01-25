const initialState = {
  categories: [],
  category: [],
  status: "idle",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORIES_STATUS_LOADING":
      return {
        ...state,
        status: "loading",
      };

    case "CATEGORIES_STATUS_FAILED":
      return {
        ...state,
        status: "failed",
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        status: "idle",
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        status: "idle",
      };

    case "GET_CATEGORY_BY_ID":
      return {
        ...state,
        category: action.payload,
        status: "idle",
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
        status: "idle",
      };

    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) => {
          if (c.id === parseInt(action.payload.id)) return action.payload.data;
          else return c;
        }),
        status: "idle",
      };

    default:
      return state;
  }
};

export default categoriesReducer;
