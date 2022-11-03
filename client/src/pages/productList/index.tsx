import React from "react";

import { Product } from "../../interfaces/product";

import ProductCard from "../../components/productCard";
import { useGetProductsQuery } from "../../redux/services/products";

import { useAppSelector } from "../../hooks/reduxHooks";

import { getDropdownSelector } from "../../redux/dropdown/dropdownSlice";

const ProductList = () => {
  const sortByName = useAppSelector(getDropdownSelector);

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

  const products = [...data?.products];

  return (
    <div className="main_container">
      {sortByName
        ? products
            ?.sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .map((product: Product) => (
              <ProductCard key={product.name} {...product} />
            ))
        : products?.map((product: Product) => (
            <ProductCard key={product.name} {...product} />
          ))}
    </div>
  );
};

export default ProductList;
