import React, { useEffect } from "react";
import { getAllReviews } from "../../redux/actions/review";
import { useSelector, useDispatch } from "react-redux";
import { FaGuitar } from "react-icons/fa";
import { ReviewCard } from "./ReviewProduct_style"

const Review = ({ id }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(({ review }) => review.review);
  const user = useSelector(({ users }) => users.user);

  useEffect(() => {
    dispatch(getAllReviews(id));
  }, [dispatch, id]);

  if (reviews.length > 0) {
    return (
      <ReviewCard>
        {reviews.map((review, index) => {
          return review.productId ? (
            <div key={index} className="container">
              <h4>
                {[...Array(5)].map((star, i) => { 
                  let ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <FaGuitar
                        color={
                          ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"
                        }
                      />
                    </label>
                  );
                })}
              </h4>
              {review.userId === user.id ? <h4>User: {user.givenName}</h4> : null}
              <h4>{review.description}</h4>
              <h4 className="date">Date: {review.createdAt.slice(0, 10)}</h4>
            </div>
          ) : null;
        })}
      </ReviewCard>
    );
  } else return <h3>This Product doesn't have any Review yet !</h3>;
};

export default Review;