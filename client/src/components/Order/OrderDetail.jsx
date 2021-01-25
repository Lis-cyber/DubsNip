import React from "react";
import { OrderBody } from "./OrderDetail_style";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showOneOrder } from "../../redux/actions/order";
import { removeReview } from "../../redux/actions/review";
import AddReview from "../Review/AddReview";
import { Link } from "react-router-dom";
import { FaGuitar } from "react-icons/fa";
import { BiEdit, BiTrash } from "react-icons/bi";

export default function OrderDetail(orderId) {
  const dispatch = useDispatch();
  const idO = orderId.match.params.id;
  const user = useSelector(({ users }) => users.user);
  const order = useSelector(({ order }) => order.order[0]);
  const rating = useSelector(({ review }) => review.rating);
  const reviews = useSelector(({ review }) => review.review);
  const productIdStore = useSelector(
    ({ review }) => review.doneReviewProductId
  );

  const DeleteReviewFunction = (productId) => {
    let filterId = reviews.filter(
      (idDeLaReview) => idDeLaReview.productId === productId
    );
    if (reviews) {
      dispatch(removeReview(productId, filterId[0].id));
    }
  };

  const comprobarUser = () => {
    if (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].userId === user.id) {
          return true;
        }
      }
      return false;
    }
  };

  useEffect(() => {
    dispatch(showOneOrder(user?.id, idO));
  }, [dispatch, user, idO]);

  if (order) {
    return (
      <OrderBody>
        <div>
          <h2>Order {order.id}</h2>
          <div className="orderCont">
            <div className="product_line">
              <div className="info">
                <p>State: {order.state}</p>
                <p>Date: {order.createdAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className="desc-prod">
              <div className="description">
                <h4 className="desc P">Product:</h4>
                <h4 className="desc Q">Quantity:</h4>
                <h4 className="desc Pri">Price:</h4>
                <h4 className="desc S">Subtotal:</h4>
                {order.state === "completed" ? (
                  <h4 className="desc R">Review:</h4>
                ) : (
                  <></>
                )}
              </div>
              <div className="product_line">
                <div className="detail">
                  <ol>
                    {order?.products.map((product, i) => {
                      const { quantity, price } = product.Order_Product;
                      return (
                        <li key={i}>
                          <div className="detail">
                            <h4 className="product_name">{product.name}</h4>
                            <div className="detailP">
                              <div className="quantity">{quantity}</div>
                              <div className="price"> ${price.toFixed(2)} </div>
                              <div className="subtotal">
                                ${(price * quantity).toFixed(2)}
                              </div>
                              {order.state === "completed" ? (
                                <div>
                                  {productIdStore.includes(product.id) &&
                                  comprobarUser() ? (
                                    <div className="reviews">
                                      <h4>
                                        {[...Array(5)].map((star, i) => {
                                          let ratingValue = i + 1;
                                          return (
                                            <label key={i}>
                                              <FaGuitar
                                                color={
                                                  ratingValue <=
                                                  // rating = [5, 4, 3]
                                                  // userId = [4, 5, 2]
                                                  rating[
                                                    productIdStore.indexOf(
                                                      product.id
                                                    )
                                                  ]
                                                    ? // rating[constante]
                                                      //   reviews.userId.indexOf(
                                                      //     user.id
                                                      //   )
                                                      "#ffc107"
                                                    : "#e4e5e9"
                                                }
                                              />
                                            </label>
                                          );
                                        })}
                                      </h4>
                                      <Link
                                        to={`/editreview/${product.id}/${user.id}`}
                                      >
                                        <button className="editOrRemoveReviewBtn">
                                          <BiEdit />
                                        </button>
                                      </Link>
                                      <button
                                        className="editOrRemoveReviewBtn"
                                        onClick={() =>
                                          DeleteReviewFunction(product.id)
                                        }
                                      >
                                        <BiTrash />
                                      </button>
                                    </div>
                                  ) : (
                                    <Link
                                      to={`/addreview/${product.id}/${user.id}`}
                                    >
                                      <button
                                        key={product.id}
                                        className="addReviewBtn"
                                        onClick={() => AddReview}
                                      >
                                        Add Review
                                      </button>
                                    </Link>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
            <div className="finish">
              <span className="total">
                Total: $
                {order.products
                  .reduce(
                    (acc, curr) =>
                      acc +
                      curr.Order_Product.quantity * curr.Order_Product.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </OrderBody>
    );
  } else return <h3>Loading...</h3>;
}
