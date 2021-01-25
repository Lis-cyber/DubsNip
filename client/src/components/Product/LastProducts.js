import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLastProductsAdded } from "../../redux/actions/products";
import { LastProductsStyle } from "./LastProducts_style";
import { IoMdClose } from "react-icons/io";

const LastProducts = ({ setShowNewProducts }) => {
  const dispatch = useDispatch();
  const [lastProducts, setLastProducts] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    async function getLastProducts() {
      const products = await dispatch(getLastProductsAdded());
      if (!products.length) setErr(products.response.data);
      else setLastProducts(products);
    }
    getLastProducts();
  }, [dispatch]);

  if (lastProducts.length) {
    return (
      <LastProductsStyle>
        <div className="mainContainer">
          <div className="pageTitle">
            <div className="pageTitleTitle">¡¡ NEW PRODUCTS !! </div>
            <button
              className="ctaButton"
              onClick={() => {
                setShowNewProducts(false);
              }}
            >
              <IoMdClose size="1rem" />
            </button>
          </div>
          <div className="cards">
            {lastProducts.map((product, i) => (
              <div key={i} className="lastProductsContainer">
                <Link to={`/products/${product.id}`}>
                  <div className="name">{product.name}</div>
                </Link>
                <img src={product.picture} className="picture" alt="" />
                <div className="description">{product.description}</div>
                <div className="price">${product.price}</div>
                <div className="stock">Stock: {product.stock}</div>
              </div>
            ))}
          </div>
        </div>
      </LastProductsStyle>
    );
  } else if (err.length > 0) {
    return <h1>{err}</h1>;
  } else {
    return <h1>Loading...</h1>;
  }
};

export default LastProducts;
