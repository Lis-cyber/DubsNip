import { PaginationStyle } from "./Pagination_style";
import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationStyle>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <div key={number} className="divLi">
              <button onClick={() => paginate(number)}>{number}</button>
            </div>
          );
        })}
      </ul>
    </PaginationStyle>
  );
};

export default Pagination;
