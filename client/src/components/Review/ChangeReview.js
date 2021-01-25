import React, { useState } from "react";
import { editReview } from "../../redux/actions/review";
import { useSelector, useDispatch } from "react-redux";
import { FaGuitar } from "react-icons/fa";
import { CategoryStyle } from "../Category/Category_style";
import { ReviewStyle } from "../Review/Reviews_style";

const ChangeReview = ({ productId, userId }) => {
  const dispatch = useDispatch();

  const reviews = useSelector(({ review }) => review.review);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [doneReview, setDoneReview] = useState(false);
  const [input, setInput] = useState({
    rating: "",
    description: "",
    userId: userId,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ChangeReviewFunction = (productId) => {
      let filterId = reviews.filter(
        (idDeLaReview) => idDeLaReview.productId === parseInt(productId)
      );
      if (input.rating || (input.rating && input.description)) {
        setDoneReview(true);
        dispatch(editReview(productId, filterId[0].id, input));
      } else {
        alert("You need to add a rating");
      }
    };
    ChangeReviewFunction(productId);
  };

  return (
    <CategoryStyle>
      <div>
        <ReviewStyle>
          <button className="btnR" onClick={() => window.history.back()}>
            Go Back !
          </button>
        </ReviewStyle>
        {doneReview ? (
          <div className="review">
            Rating:
            <h4>
              {[...Array(5)].map((star, i) => {
                let ratingValue = i + 1;
                return (
                  <label key={i}>
                    <FaGuitar
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </h4>
            Description: <h3>{input.description}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Edit Rating</label>
            <div>
              <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        value={ratingValue}
                        onChange={handleChange}
                        onClick={() => setRating(ratingValue)}
                        name="rating"
                        style={{ display: "none" }}
                      />
                      <FaGuitar
                        color={
                          ratingValue <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseOut={() => setHover(null)} // buscar un evento parecido a este
                        style={
                          ({ cursor: "pointer" }, { transition: "color 200ms" })
                        }
                      />
                    </label>
                  );
                })}
              </div>
              <textarea
                cols="40"
                rows="4"
                onChange={handleChange}
                placeholder="Review description..."
                name="description"
                type="text"
                value={input.description}
              />
            </div>
            <div className="btn">
              <input type="submit" className="btnC" value="Edit Review" />
            </div>
          </form>
        )}
      </div>
    </CategoryStyle>
  );
};

export default ChangeReview;
