import React from "react";
import { LoadingStyle } from "./StyledLoading_style";

const StyledLoading = () => {
  return (
    <LoadingStyle>
      <div className="loading-screen">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </LoadingStyle>
  );
};

export default StyledLoading;
