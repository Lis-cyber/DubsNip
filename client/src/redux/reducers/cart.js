const initialState = {
  categories: [],
  cart: [],
  showCart: false,
  status: "idle",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_STATUS_LOADING":
      return {
        ...state,
        status: "loading",
      };

    case "CART_STATUS_FAILED":
      return {
        ...state,
        status: "failed",
      };

    case "SHOW_CART":
      return {
        ...state,
        showCart: action.payload,
      };

    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

    case "GET_GUEST_CART":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

    case "CART_USER":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

    case "CHANGE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) return action.payload;
          return el;
        }),
        status: "idle",
      };

    case "CHANGE_QUANTITY_GUEST":
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) return action.payload;
          return el;
        }),
        status: "idle",
      };

    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

    case "ADD_PRODUCT_DETAIL_GUEST":
      if (!action.payload) return { ...state, status: "idle" };
      return {
        ...state,
        cart: [...state.cart, action.payload],
        status: "idle",
      };

    case "ADD_PRODUCT_GUEST":
      if (!action.payload) return { ...state, status: "idle" };
      return {
        ...state,
        cart: [...state.cart, action.payload],
        status: "idle",
      };

    case "DELETE_CART":
      return {
        ...state,
        cart: action.payload === "OK" ? [] : state.cart,
        status: "idle",
      };

    case "DELETE_CART_GUEST":
      return {
        cart: [],
        status: "idle",
      };

    case "DELETE_PRODUCT_GUEST":
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
        status: "idle",
      };

    case "DELETE_PRODUCT_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
        status: "idle",
      };

    case "CART_GUEST_TO_USER":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

    case "CHANGE_Q_GUEST_LS":
      return {
        ...state,
        cart: action.payload,
        status: "idle",
      };

      case "DELETE_CART_REDUX":
        return {
          ...state,
          cart: [],
          status: "idle",
        };  

    default:
      return state;
  }
};

export default categoriesReducer;
