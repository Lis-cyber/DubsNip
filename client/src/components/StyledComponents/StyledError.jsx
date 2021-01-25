import React from "react";
import { Link } from "react-router-dom";
import { ErrorStyle } from "./StyledError_style";
const StyledError = () => {
  return (
    <ErrorStyle>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <br />
                  <br />
                  <h3 className="h2">Looks like you're lost</h3>
                  <p>the page you are looking for it's not available!</p>
                  <Link to="/" className="link_404">
                    <span>Go to Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorStyle>
  );
};
export default StyledError;
