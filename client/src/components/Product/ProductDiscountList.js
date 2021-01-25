import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsDiscount } from "../../redux/actions/products";
// import StyledError from "../StyledComponents/StyledError";
import StyledLoading from "../StyledComponents/StyledLoading";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { Catalogue, Container } from "./ProductList_style.jsx";

// Este componente muestra todos los productos
const ProductDiscount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const products = useSelector(({ products }) => products.products);
  const status = useSelector(({ products }) => products.status);
  const dispatch = useDispatch();
console.log(products)
  useEffect(() => {
    dispatch(getProductsDiscount());
  }, [dispatch]);

  if (status === "loading") return <StyledLoading />;
  if (status === "failed" || products.length < 1) return <h2 className="noFind">No products in discount !</h2>;

  //Current posts
  const currentPosts = products.slice(
    currentPage * productsPerPage - productsPerPage,
    currentPage * productsPerPage
  );

  if(products?.length){
  return (
    <div>
      <Container>
        <Catalogue>
          <div className="cards">
            {currentPosts.map((product, i) => (
              <ProductCard
                className="product_card"
                stock={product.stock}
                key={i}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                picture={product.picture}
                description={product.description}
              />
            ))}
          </div>
        </Catalogue>
      </Container>
      <div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  ); }
};

export default ProductDiscount;