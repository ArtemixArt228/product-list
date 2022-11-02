import React, { useEffect, useState } from "react";

import { Product } from "../../interfaces/product";

import ProductCard from "../../components/productCard";
import { useGetProductsQuery } from "../../redux/services/products";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getModalSelector } from "../../redux/modal/modalSlice";
import {
  getProductsSelector,
  setProducts,
} from "../../redux/product/productSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector(getProductsSelector);

  const {
    data,
    isFetching,
    error,
  }: {
    data: { products: Product[] };
    isFetching: boolean;
    error: any;
  } = useGetProductsQuery<any>();

  useEffect(() => {
    if (products?.length === 0 || isFetching === false) {
      console.log(data.products);
      dispatch(setProducts(data.products as Product[]));
    }
  }, [isFetching]);
  return (
    <div className="main_container">
      {data.products?.map((product: Product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
