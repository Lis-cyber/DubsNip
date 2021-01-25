const initialState = {
  products: [],
  product: {},
  status: "idle",
  search: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_STATUS_LOADING":
      return {
        ...state,
        status: "loading",
      };

    case "PRODUCT_STATUS_FAILED":
      return {
        ...state,
        status: "failed",
      };

    case "PRODUCT_STATUS_SUCCEEDED":
      return {
        ...state,
        status: "succeeded",
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        status: "idle",
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        status: "idle",
      };

    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === parseInt(action.payload.id)) return action.payload.data;
          else return p;
        }),
        status: "idle",
      };

    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        product: action.payload,
        status: "idle",
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        status: "idle",
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        search: action.payload,
        status: "idle",
      };

    case "EDIT_CATEGORIES_FROM_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === parseInt(action.payload.id)) return action.payload;
          else return p;
        }),
        status: "succeeded",
      };

      case "GET_PRODUCTS_DISCOUNT":
        return {
          ...state,
          products: action.payload,
          status: "idle",
        };

    default:
      return state;
  }
};

export default productsReducer;
