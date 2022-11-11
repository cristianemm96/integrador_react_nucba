import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../../Redux/Products/productActions";
import { getProductsFrom } from "./productsCategory";
import { getProductsFromSearch } from "../../../Utils/getProductsFromSearch";
import { useState } from "react";
import { Search } from "../Search/Search";
import { ProductsPrinter } from "./ProductsPrinter";

export const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://amasong-88ebb-default-rtdb.firebaseio.com/products.json"
      );
      const json = await data.json();
      return json;
    };
    fetchData().then((res) => dispatch(loadProducts(res)));
  }, []);
  let productsStateFull = useSelector((state) => state.products.products);
  let productsState = productsStateFull;
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const [word, setWord] = useState("");
  if (selectedCategory) {
    productsState = getProductsFrom(
      selectedCategory,
      productsState
    );
  }

  if (word) {
    productsState = getProductsFromSearch(word, productsState);
  }

  return (
    <div style={{marginTop:"15px"}}>
      <Search itemSearch={word} setter={setWord} />
      <ProductsPrinter products={productsState} />
    </div>
  );
};

