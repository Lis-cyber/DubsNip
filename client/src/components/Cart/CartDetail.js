import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartDetailContainer } from "./CartDetail_style.js";
import {
  deleteProduct,
  changeQuantity,
  deleteCart,
  deleteProductGuest,
  changeQuantityGuest,
  deleteCartGuest,
  changeQGuestLS,
} from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import StyledLoading from "../StyledComponents/StyledLoading.jsx";
import {useHistory} from "react-router-dom"

export default function CartDetail() {
  const user = useSelector(({ users }) => users.user);
  const cart = useSelector(({ cart }) => cart.cart);
  const dispatch = useDispatch();
  const status = useSelector(({ cart }) => cart.status);
  const [click , setClick] = useState(false);
  const history = useHistory()
  const locationMail = window.location.href
  const location = true
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
    let html = document.querySelector('#root');
    let cont = document.createElement('div');
    cont.setAttribute('class', 'alert');
    html.appendChild(cont);
    let msg = document.createElement('p');
    msg.textContent = product + ': Stock no disponible';
    cont.appendChild(msg);
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'ok';
    cont.appendChild(closeBtn);
    closeBtn.onclick = function() {
      cont.parentNode.removeChild(cont);
    }
  }

  const addQuantity = (quantity, productId, stock, product) => {
    if ((quantity + 1) > stock){displayMessage(product)}
    if (quantity < stock) {
      quantity += 1;
      if (user) dispatch(changeQuantity(user?.id, quantity, productId));
      else {
        dispatch(changeQuantityGuest(quantity, productId, product));
        dispatch(changeQGuestLS(quantity, productId));
      }
  }
  };


  function displayConfirm() {
    let html = document.querySelector('#root');
    let cont = document.createElement('div');
    cont.setAttribute('class', 'alert');
    html.appendChild(cont);
    let msg = document.createElement('p');
    msg.textContent = 'Do you really want to delete the cart?';
    cont.appendChild(msg);
    let noBtn = document.createElement('button');
    noBtn.textContent = 'no';
    let yesBtn = document.createElement('button');
    yesBtn.textContent = 'yes';
    cont.appendChild(yesBtn);
    cont.appendChild(noBtn);
    yesBtn.onclick = function() {
      cont.parentNode.removeChild(cont);
      let html = document.querySelector('#root');
      let cont2 = document.createElement('div');
      cont2.setAttribute('class', 'alert');
      html.appendChild(cont2);
      let msg = document.createElement('p');
      msg.textContent = 'The cart has been deleted';
      cont2.appendChild(msg);
      let closeBtn = document.createElement('button');
      closeBtn.textContent = 'ok';
      cont2.appendChild(closeBtn);
      closeBtn.onclick = function() {
        if (!user) {
          dispatch(deleteCartGuest());
        }
        if (user?.id) dispatch(deleteCart(user.id));
        cont2.parentNode.removeChild(cont2);
    }
  }
  noBtn.onclick = function() {
    cont.parentNode.removeChild(cont);
    let html = document.querySelector('#root');
    let cont3 = document.createElement('div');
    cont3.setAttribute('class', 'alert');
    html.appendChild(cont3);
    let msg = document.createElement('p');
    msg.textContent = 'The cart has not been deleted';
    cont3.appendChild(msg);
    let closeBtn1 = document.createElement('button');
    closeBtn1.textContent = 'ok';
    cont3.appendChild(closeBtn1);
    closeBtn1.onclick = function() {
      cont3.parentNode.removeChild(cont3);
  }
}
}

  const handleDelete = (productId) => {
    if (user) {
      dispatch(deleteProduct(user?.id, productId));
    }
    if (!user) {
      dispatch(deleteProductGuest(productId));
    }
  };

  const handleDeleteCart = () => {
    displayConfirm()
  };

function handleClick(e){
  e.preventDefault()
  setClick(true)
 // localStorage.setItem("location", JSON.stringify(location))
}
function handleClickYes(e){
  e.preventDefault()
  localStorage.setItem("location", JSON.stringify(location))
  history.push({ pathname: '/login',
    state: { detail: locationMail }})
}
function handleClickNo(e){
  e.preventDefault()
  localStorage.setItem("location", JSON.stringify(location))
  history.push({ pathname: '/signup',
    state: { detail: locationMail }})
}

  if (cart) {
    if (status === "loading") return <StyledLoading />;
    else
      return (
        <CartDetailContainer>
          {!cart?.length ? (
            <h2>You didn't add any products yet!</h2>
          ) : (
            <>
              <div className="products">
                <div className="delet">
                  <button onClick={() => handleDeleteCart()} className="btnDC">
                    Delete cart
                  </button>
                </div>
                {cart.map((product, i) => {
                  const { quantity } = product.Order_Product;
                  const priceDiscount = (product.price - (product.discount * product.price / 100)).toFixed(2)
                  return (
                    <div className="product_line" key={i}>
                      <h3 className="product_name">Product: {product.name}</h3>
                      <div className="product_detail">
                        <div className="quantity">
                          <button
                            onClick={() => restQuantity(quantity, product.id)}
                            className="product_btn"
                          >
                            -
                          </button>
                          <span>Quantity: {quantity}</span>
                          <button
                            onClick={() =>
                              addQuantity(quantity, product.id, product.stock, product.name)
                            }
                            className="product_btn"
                          >
                            +
                          </button>
                        </div>
                        {product.discount ? <span>Price: ${priceDiscount}</span> : <span>Price: ${product.price.toFixed(2)}</span>}
                        {product.discount ? <span>
                          Subtotal: ${(priceDiscount * quantity).toFixed(2)}
                        </span> : <span>
                          Subtotal: ${(product.price * quantity).toFixed(2)}
                        </span>}
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
              </div>
              <div className="finish">
                <span className="total">
                  Total $
                  {cart
                      ?.reduce((acc, curr) => {
                        return acc + (curr.price - (curr?.discount * curr.price / 100))* curr.Order_Product.quantity;
                      }, 0)
                      .toFixed(2)}
                </span>
                <div className="btnBDiv">
                {user ?
                  <Link to={`/${user.id}/checkout`}>
                   <button className="btnB">Buy</button>
                  </Link> : 
                  <button className="btnB" onClick={handleClick}>
                  Buy</button>}
                {click?
                 <div className="yourUser">
                        <p>Do you have a user yet?</p>
                        {/* <Link to={{ pathname: '/login', state: { locationMail } }}> */}
                          <button className="yes" onClick={handleClickYes}>Yes</button>
                        {/* </Link> */}
                        {/* <Link to={{ pathname: '/signup', state: { locationMail } }}> */}
                          <button className="no" onClick={handleClickNo}>No</button>
                        {/* </Link> */}
                </div> : null
                }
                </div>
              </div>
            </>
          )}
        </CartDetailContainer>
      );
  } else return null;
}