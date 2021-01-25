import StyledLoading from ".././StyledComponents/StyledLoading";
import StyledError from ".././StyledComponents/StyledError";
import React, { useEffect, useState } from "react";
import { CardDetail } from "./ProductDetail_style";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/actions/products";
import {
  addProductToCart,
  addProductDetailGuest,
} from "../../redux/actions/cart";
import ReviewProduct from "../Review/ReviewProduct";

// Este componente muestra el detalle de un producto
const Product = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const product = useSelector(({ products }) => products.product);
  const status = useSelector(({ products }) => products.status);
  const [reviewsResult, setreviewsResult] = useState(false);
  const reviews = useSelector(({ review }) => review.review);
  const priceDiscount = (
    product.price -
    (product.discount * product.price) / 100
  ).toFixed(2);

  useEffect(() => {
    dispatch(getProductById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (status === "loading") return <StyledLoading />;
  if (status === "failed") return <StyledError />;

  const handleAdd = (id) => {
    if (!user) {
      dispatch(addProductDetailGuest(product));
    }
    if (user?.id) dispatch(addProductToCart(user.id, id));
  };

  const filterRatings = reviews.filter(
    (numero) => numero.productId === Number(id)
  );

  const ratingAvg = () => {
    var total = 0;
    for (let i = 0; i < filterRatings.length; i++) {
      total += filterRatings[i].rating;
    }
    const average = total / filterRatings.length;
    if (typeof average === "number") return average;
    else return "This product doesn't have reviews yet";
  };

  return (
    <CardDetail>
      <div className="productDetail">
        <div className="textDetail">
          <div className="title">
            <h1>{product.name}</h1>
          </div>
          <div className="price">
            <h3>Price:</h3>
            <h3 className={product.discount ? "price_discount" : "card_price"}>
              {" "}
              $ {product.price}
            </h3>
          </div>
          {product.discount ? <h3>Now: ${priceDiscount} !</h3> : <></>}
          <div className={product.discount ? "descDis" : "desc"}>
            {product.discount ? <p> DISCOUNT: % {product.discount}</p> : <></>}
            <p>Description: {product.description}</p>
            <div className="st">
              <p>Stock: {product.stock}</p>
            </div>
            <p>
              Categories:
              {product.categories &&
                product.categories.map((name) => {
                  return name.name + ". ";
                })}
            </p>
          </div>
          <div className="btn">
            <div>
              <button
                className="add"
                onClick={() => setreviewsResult(!reviewsResult)}
              >
                Reviews
              </button>
              <h4>
                {reviews.length > 0 ? (
                  <h4>Average Rating : {ratingAvg()}</h4>
                ) : null}
              </h4>
            </div>
            <button className="add" onClick={() => handleAdd(product.id)}>
              ADD to the cart
            </button>
          </div>
        </div>
        <div className="img">
          <img src={product.picture} alt="" />
        </div>
      </div>
      {reviewsResult ? (
        <div className="allReviews">
          <ReviewProduct id={product.id} />
        </div>
      ) : null}
    </CardDetail>
  );
};

export default Product;
