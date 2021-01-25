import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions/products";
import { addProductToCart, addProductGuest } from "../../redux/actions/cart";
import { CardBody } from "./ProductCard_style";
import discountLogo from "../../media/icons/discount.svg";

// Este componente muestra la previsualización de un producto
const ProductCard = ({
  id,
  name,
  description,
  price,
  discount,
  picture,
  stock,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const priceDiscount = (price - (discount * price) / 100).toFixed(2);
  
  function displayConfirm() {
    let html = document.querySelector('#root');
    let cont = document.createElement('div');
    cont.setAttribute('class', 'alert');
    html.appendChild(cont);
    let msg = document.createElement('p');
    msg.textContent = 'Do you really want to delete ' + name + '?';
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
      msg.textContent = name + ' has been deleted';
      cont2.appendChild(msg);
      let closeBtn = document.createElement('button');
      closeBtn.textContent = 'ok';
      cont2.appendChild(closeBtn);
      closeBtn.onclick = function() {
        dispatch(deleteProduct(id));
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
    msg.textContent = name + ' has not been deleted';
    cont3.appendChild(msg);
    let closeBtn1 = document.createElement('button');
    closeBtn1.textContent = 'ok';
    cont3.appendChild(closeBtn1);
    closeBtn1.onclick = function() {
      cont3.parentNode.removeChild(cont3);
  }
}
}
  

  const handleDelete = async () => {
    displayConfirm()
  };
  const handleAdd = (id) => {
    if (!user) {
      dispatch(addProductGuest(null, id));
    }

    if (user?.id) dispatch(addProductToCart(user.id, id));
  };

  return (
    <CardBody>
      <div className="card_header">
        <Link to={`/products/${id}`}>
          <h3>{name}</h3>
        </Link>
        {user?.isAdmin ? (
          <div className="admin_btns">
            <Link to={`/editproduct/${id}`}>edit</Link>
            <button className="delete_btn" onClick={handleDelete}>
              x
            </button>
          </div>
        ) : null}
      </div>
      <div className="img_container">
        <img src={picture} alt="" />
      </div>
      <div className="card_info">
        <div className="prices">
          <p className={discount ? "price_discount" : "card_price"}>
            Price ${price}
          </p>
          {discount ? (
            <p className="card_price">Now: ${priceDiscount} !</p>
          ) : (
            <></>
          )}
        </div>
        <div className="card_disc">
          <div className="disc_logo_cont">
            {discount ? (
              <img alt="discount" className="disclogo" src={discountLogo}></img>
            ) : (
              <></>
            )}
          </div>
          {discount ? <p className="disc">{discount}</p> : <></>}
        </div>
        <div className="bottom_info">
          <p className="card_description">{description?.slice(0, 40)}...</p>
          <span className="add_btn" onClick={() => handleAdd(id)}>
            +
          </span>
        </div>
        {!stock && <p className="stock">Not available</p>}
      </div>
    </CardBody>
  );
};

export default ProductCard;
