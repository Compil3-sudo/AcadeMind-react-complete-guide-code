import React from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];

const Products = () => {
  return (
    <>
      <h1>Products</h1>
      <ul>
        {/* <li>
          <Link to="/products/product-1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/product-2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/product-3">Product 3</Link>
        </li> */}
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            {/* <Link to={`/products/${prod.id}`}>{prod.title}</Link> */}
            <Link to={prod.id} relative="">
              {prod.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
