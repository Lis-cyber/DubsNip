import React, { useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/actions/products";
import StyledLoading from "../StyledComponents/StyledLoading";
import StyledError from "../StyledComponents/StyledError";

// Este componente muestra todos los productos
const Search = ({ keyword }) => {
  const dispatch = useDispatch();
  const search = useSelector(({ products }) => products.search);
  const status = useSelector(({ products }) => products.status);
  const products = useSelector(({ products }) => products.products);

  useEffect(() => {
    dispatch(searchProducts(keyword));
  }, [keyword, products, dispatch]);

  if (status === "loading") return <StyledLoading />;

  if (status === "failed" || (search && search.length < 1))
    return <StyledError />;

  return (
    <div className="cards">
      {search.map((product, i) => (
        <ProductCard
          key={i}
          stock={product.stock}
          id={product.id}
          name={product.name}
          price={product.price}
          picture={product.picture}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default Search;
