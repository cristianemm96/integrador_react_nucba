import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import './style.css'
export const UserAccount = () => {
  const user = useSelector(state => state.user.user)
  const currentId = user.user.uid
  const [purchasedItems, setPurchItems] = useState([]);
  useEffect(() => {
    fetch("https://amasong-88ebb-default-rtdb.firebaseio.com/shopping.json/")
      .then((res) => res.json())
      .then((data) =>
        Object.entries(data).map((p) => {
          if (p[1].userId == currentId) {
            setPurchItems((s) => [...s, p[1]]);
          }
        })
      );
  }, []);
  return (
    
    <div className="shopsContainer">
      {purchasedItems.length > 0 ? purchasedItems.map((c) => (
        <div key={Math.random()} className="shopContainer">
        <div style={{width:"90%"}}>Pedido Realizado el: {c.fecha}</div>
        <div>
          {c.products.map((x)=>
          <div key={Math.random()} className="prodInShopContainer">
            <div>{x.name}</div>
            <div><img src={x.img} className="prodImg"/></div>
          </div>
          )}
        </div>
        </div>
      )):
      <div className="emptyShops">
        No has comprado ningun producto
      </div>}
    </div>
  );
};
