import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "./Sidebar.js";
import { Container, CartIcon } from "./styles";
import logo from "../../media/Logo-single-line.svg";
import cartImage from "../../media/icons/cart.svg";
import Cart from "../Cart/";
import { useDispatch, useSelector } from "react-redux";
import { HiMenuAlt2 } from "react-icons/hi";
import axios from "axios";
import { setUser } from "../../redux/actions/users";
import { showCart as showCartCb } from "../../redux/actions/cart";

const Navbar = () => {
  const dispatch = useDispatch();
  // const [showCart, setShowCart] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const cart = useSelector(({ cart }) => cart.cart);
  const showCart = useSelector(({ cart }) => cart.showCart);
  const user = useSelector(({ users }) => users.user);

  const handleCartClick = () => {
    dispatch(showCartCb(!showCart));
  };

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Sidebar toggle={handleSidebar} show={showSidebar} />
      <Container>
        <div className="left_menu">
          <HiMenuAlt2
            onClick={handleSidebar}
            className="ham_btn"
            size="1.5rem"
          />
          <Link to={`/`}>
            <img alt="dubsNIP" className="logo" src={logo} />
          </Link>
        </div>
        <div className="userDivContainer">
          {user ? (
            <div className="userDiv">
              <div>
                {user.isAdmin ? (
                  <span>Admin: {user.givenName}</span>
                ) : (
                  <span>User: {user.givenName}</span>
                )}
              </div>
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="No profile pic"
                  className="photoUser"
                ></img>
              ) : (
                <></>
              )}
            </div>
          ) : null}
        </div>
        <nav className="menu">
          <div className="searchbar">
            <SearchBar />
          </div>
          <Link className="menu_item menu_btn" to="/products">
            <span className="active">Store</span>
          </Link>
          {!user ? (
            <Link className="menu_item menu_btn" to="/login">
              <span>Log in</span>
            </Link>
          ) : (
            <Link
              onClick={() => {
                window.localStorage.removeItem("token");
                dispatch(setUser(null));
                axios.defaults.headers.common["Authorization"] = undefined;
                //Comente esto porque estaba pasando cosas raras
                // window.location.reload();
              }}
              className="menu_item menu_btn"
              to="/"
            >
              <span>Log out</span>
            </Link>
          )}
          {!user ? (
            <Link className="menu_item menu_btn" to="/signup">
              <span className="sign_up">SIGN-UP</span>
            </Link>
          ) : null}
          <CartIcon onClick={handleCartClick} className="menu_item">
            <div
              className={showCart ? "cart_container active" : "cart_container"}
            >
              <img
                alt="Cart"
                className={showCart ? "cart active" : "cart"}
                src={cartImage}
              />
              {cart?.length > 0 ? (
                <div className="quantity">
                  {cart.length}
                  {/*aca hay que ponerle una variable del estado del cart*/}
                </div>
              ) : null}
            </div>
          </CartIcon>
        </nav>
      </Container>
      <Cart show={showCart} />
      <div style={{ height: 75 }} className="nav_space"></div>
    </>
  );
};

export default Navbar;
