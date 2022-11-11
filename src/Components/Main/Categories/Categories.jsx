import React from "react";
import { CategorieContainer } from "./Categorie_Container/CategorieContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadCategories } from "../../../Redux/Categories/CategorieAction/categoriesAction";
import './style.css'

export const Categories = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async ()=>{
      const data = await fetch('https://amasong-88ebb-default-rtdb.firebaseio.com/categories.json')
      const json =  await data.json()
      return json
    }
    fetchData()
    .then(res=>dispatch(loadCategories(res)))
  },[]);
  return (
    <div
      className="categoriesContainer"
    >
      {categories.map((p) => (
        <CategorieContainer key={Math.random()} name={p.categorie} />
      ))}
    </div>
  );
};
