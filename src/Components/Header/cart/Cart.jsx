import React from "react";
import { useState } from "react";
import OpenCart from "./OpenCart/OpenCart";
import './style.css'
export const Cart = () => {
  let initialFlag = false;
  const [flag, setFlag] = useState(initialFlag);
  return (
    <div onClick={() => setFlag(!flag)}>
      <div className="cartIconContainer">
        <img
          src="https://i.ibb.co/T1dG4H1/icons8-shopping-cart-30.png"
          className="cartIcon"
        />
      </div>
      {flag && <OpenCart />}
    </div>
  );
};
