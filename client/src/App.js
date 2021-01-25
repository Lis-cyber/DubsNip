import { BrowserRouter, Route, Switch } from "react-router-dom";
import StyledError from "./components/StyledComponents/StyledError";
import React, { useEffect } from "react";
import MeComponent from "./components/Users/MeComponent";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions/users";
import "./App.css";
import ProductList from "./components/Product/ProductList";
import ProductDetail from "./components/Product/ProductDetail";
import Category from "./components/Category/Category";
import CreateProduct from "./components/Product/CreateProduct";
import Navbar from "./components/NavBar/";
import ChangeProduct from "./components/Product/ChangeProduct";
import CategoryList from "./components/Category/CategoryList";
import CategoryDetail from "./components/Category/CategoryDetail";
import Home from "./components/Home";
import Search from "./components/SearchBar/Search";
import CategoryEdit from "./components/Category/CategoryEdit";
import Order from "./components/Order";
import Footer from "./components/Footer/";
import FormSignup from "./components/Form/FormSignup";
import OrderDetail from "./components/Order/OrderDetail";
import Admin from "./components/Home/Home";
import CartDetail from "./components/Cart/CartDetail";
import AdminOrders from "./components/Order/AdminOrders";
import AdminUsers from "./components/Users/AdminUsers";
import AdminOrdersDetail from "./components/Order/AdminOrdersDetail";
import Login from "./components/Form/FormSignIn";
import Review from "./components/Review/ReviewProduct";
import AddReview from "./components/Review/AddReview";
import { getCart, getGuestCart } from "./redux/actions/cart";
import axios from "axios";
import SignIn from "./components/SignIn";
import ChangeReview from "./components/Review/ChangeReview";
import ResetPassword from "./components/Form/ResetPassword";
import ConfirmPassword from "./components/Form/ConfirmPassword";
import CheckOut from "./components/CheckOut/CheckOut";
import CheckEmail from "./components/Confirm/checkEmail";
import Confirm from "./components/Confirm/";
import Team from "./components/Team/index"
import Contact from "./components/Contact/index"
import ConfirmData from "./components/CheckOut/ConfirmData"
import ProductDiscount from "./components/Product/ProductDiscountList";
import Success from "./components/MercadoPago/Success"
import Failure from "./components/MercadoPago/Failure"


//App renderiza los componentes segun las rutas
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(setUser(user));
      dispatch(getCart(user.id));
    } else {
      dispatch(setUser(null));
      axios.defaults.headers.common["Authorization"] = undefined;
      const data = JSON.parse(localStorage.getItem("cartLS")) || [];
      dispatch(getGuestCart(data));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Switch>
          {/* <Route path="/" component={Cart} /> */}
          <Route exact path="/signup" component={FormSignup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/resetPassword" component={ResetPassword} />
          <Route
            exact
            path="/resetPassword/:token"
            component={ConfirmPassword}
          />
          <Route exact path="/sign-in/:token" component={SignIn} />
          <Route path="/check-email" component={CheckEmail} />
          <Route exact path="/confirm-email/:token" component={Confirm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/addproduct" component={CreateProduct} />
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/cartdetail" component={CartDetail} />
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin-order/:id" component={AdminOrdersDetail} />
          <Route exact path="/me" component={MeComponent} />
          <Route exact path ="/team" component = {Team} />
          <Route exact path ="/contact" component = {Contact} />
          <Route exact path="/:id/checkout" component={CheckOut} />
          <Route exact path="/confirm-data" component={ConfirmData} />
          <Route exact path="/discount" component={ProductDiscount} />
          <Route exact path="/payment/success/:id" component={Success} />
          <Route exact path="payment/failure" component={Failure} />
          <Route
            exact
            path="/user/orders"
            component={Order}
            // render={({ match }) => <OrderDetail id={match.params.id} />}
          />
          <Route exact path="/orderdetail/:id" component={OrderDetail} />
          <Route
            exact
            path="/editproduct/:id"
            component={ChangeProduct}
            render={({ match }) => <ProductDetail id={match.params.id} />}
          />
          <Route exact path="/editcategory/:id" component={CategoryEdit} />
          <Route
            exact
            path="/products/:id"
            render={({ match }) => <ProductDetail id={match.params.id} />}
          />
          <Route
            exact
            path="/products/category/:categoryName"
            render={({ match }) => (
              <ProductList category={match.params.categoryName} />
            )}
          />
          <Route
            path="/search/:keyword"
            render={({ match }) => <Search keyword={match.params.keyword} />}
          />
          <Route
            exact
            path="/categories/:id"
            render={({ match }) => <CategoryDetail id={match.params.id} />}
          />
          <Route
            exact
            path="/review/:id"
            render={({ match }) => <Review id={match.params.id} />}
          />
          <Route
            exact
            path="/addreview/:id/:userId"
            render={({ match }) => (
              <AddReview
                productId={match.params.id}
                userId={match.params.userId}
              />
            )}
          />
          <Route
            exact
            path="/editreview/:id/:userId"
            render={({ match }) => (
              <ChangeReview
                productId={match.params.id}
                userId={match.params.userId}
              />
            )}
          />
          <Route component={StyledError} />
          
        </Switch>

        <Route path="/" component={Footer} />
      </div>
    </BrowserRouter>
  );
}

export default App;
