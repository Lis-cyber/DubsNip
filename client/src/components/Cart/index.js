import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartContainer } from "./style.js";
import {
  getCart,
  deleteProduct,
  changeQuantity,
  getGuestCart,
  deleteProductGuest,
  changeQuantityGuest,
  changeQGuestLS,
  showCart,
} from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

export default function Cart() {
  const user = useSelector(({ users }) => users.user);
  const cart = useSelector(({ cart }) => cart.cart);
  const show = useSelector(({ cart }) => cart.showCart);
  const dispatch = useDispatch();
  const status = useSelector(({ cart }) => cart.status);
  const urlActual = window.location.href;
  const userId = user?.id;

  useEffect(() => {
    if (user?.id) dispatch(getCart(user.id));
    if (!user) dispatch(getGuestCart(cart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const restQuantity = (quantity, productId, product) => {
    if (quantity > 1) {
      quantity -= 1;
      if (user) dispatch(changeQuantity(user?.id, quantity, productId));
      else {
        dispatch(changeQuantityGuest(quantity, productId, product));
        dispatch(changeQGuestLS(quantity, productId));
      }
    }
  };
  function displayMessage(product) {
    let html = document.querySelector("#root");
    let cont = document.createElement("div");
    cont.setAttribute("class", "alert");
    html.appendChild(cont);
    let msg = document.createElement("p");
    msg.textContent = product + ": Stock no disponible";
    cont.appendChild(msg);
    let closeBtn = document.createElement("button");
    closeBtn.textContent = "ok";
    cont.appendChild(closeBtn);
    closeBtn.onclick = function () {
      cont.parentNode.removeChild(cont);
    };
  }

  const addQuantity = (quantity, productId, stock, product) => {
    if (quantity + 1 > stock) {
      displayMessage(product.name);
    }
    if (quantity < stock) {
      quantity += 1;
      if (user) dispatch(changeQuantity(user?.id, quantity, productId));
      else {
        dispatch(changeQuantityGuest(quantity, productId, product));
        dispatch(changeQGuestLS(quantity, productId));
      }
    }
  };

  const handleDelete = (productId) => {
    if (user) {
      dispatch(deleteProduct(user?.id, productId));
    }
    if (!user) {
      dispatch(deleteProductGuest(productId));
    }
  };

  if (
    urlActual === `${process.env.REACT_APP_API}/cartDetail` ||
    urlActual === `${process.env.REACT_APP_API}/${userId}"/checkout`
  ) {
    return null;
  } else if (show) {
    if (status === "loading") return <></>;
    return (
      <CartContainer>
        {!cart?.length ? (
          <h3>You didn't add any products yet!</h3>
        ) : (
          <>
            <h4 className="cart_title">My products:</h4>
            <div className="products">
              {cart?.map((product, i) => {
                const { quantity } = product.Order_Product;
                const priceDiscount = (
                  product.price -
                  (product.discount * product.price) / 100
                ).toFixed(2);
                return (
                  <div className="product_line" key={i}>
                    <h3 className="product_name">{product.name}</h3>
                    <div className="product_detail">
                      <div className="quantity">
                        <button
                          onClick={() =>
                            restQuantity(quantity, product.id, product)
                          }
                          className="product_btn"
                        >
                          -
                        </button>
                        <span>Quantity: {quantity}</span>
                        <button
                          onClick={() =>
                            addQuantity(
                              quantity,
                              product.id,
                              product.stock,
                              product
                            )
                          }
                          className="product_btn"
                        >
                          +
                        </button>
                      </div>
                      {/* <span>Price: ${product.price.toFixed(2)}</span> */}
                      {product.discount ? (
                        <span>${priceDiscount}</span>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="product_btn"
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="product_line">
                <div className="total">
                  <span className="total_title">Total:</span>
                  <span className="total_price">
                    $
                    {cart
                      ?.reduce((acc, curr) => {
                        return (
                          acc +
                          (curr.price - (curr?.discount * curr.price) / 100) *
                            curr.Order_Product.quantity
                        );
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="finish">
              <Link
                onClick={() => dispatch(showCart(!show))}
                to={`/cartDetail`}
              >
                More info
              </Link>
            </div>
          </>
        )}
      </CartContainer>
    );
  } else return null;
}
