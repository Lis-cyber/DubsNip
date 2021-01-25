import React, { useState } from "react";
import { addReview } from "../../redux/actions/review";
import { useDispatch } from "react-redux";
import { CategoryStyle } from "../Category/Category_style";
import { FaGuitar } from "react-icons/fa";
import { ReviewStyle } from "../Review/Reviews_style";


const AddReview = ({ productId, userId }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    rating: "",
    description: "",
    userId: userId,
  });
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [doneReview, setDoneReview] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.rating || (input.rating && input.description)) {
      dispatch(addReview(productId, input));
      setDoneReview(true);
    } else {
      alert("You need to add a rating");
    }
  };

  return (
    <CategoryStyle>
      <div>
        <ReviewStyle>
        <button className="btnR" onClick={() => window.history.back()}>Go Back !</button>
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
            <label>Add Rating</label>
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
              <input type="submit" className="btnC" value="Add Review" />
            </div>
          </form>
        )}
      </div>
    </CategoryStyle>
  );
};

export default AddReview;
