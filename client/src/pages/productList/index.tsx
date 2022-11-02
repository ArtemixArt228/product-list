import React, { useEffect, useState } from "react";

import { Product } from "../../interfaces/product";

import ProductCard from "../../components/productCard";
import { useGetProductsQuery } from "../../redux/services/products";

const ProductList = () => {
  const {
    data,
    isFetching,
    error,
  }: {
    data: { products: Product[] };
    isFetching: boolean;
    error: any;
  } = useGetProductsQuery<any>();

  if (isFetching) {
    return <>Loading...</>;
  }

  return (
    <div className="main_container">
      {data?.products?.map((product: Product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
