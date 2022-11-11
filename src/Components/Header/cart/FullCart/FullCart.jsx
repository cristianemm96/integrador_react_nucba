import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullCartProduct } from "./FullCartProduct";
import { useNavigate } from "react-router-dom";
import { addProductsToUser } from "../../../../Utils/addProductsToUser";
import { clearCart } from "../../../../Redux/Cart/CartActions/cartActions";
import '../style.css'

export const FullCart = ({id}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const carrito = useSelector((state) => state.cart.productsInCart);
  const totalPrice = carrito.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const buy = () => {
    carrito.map((p) => {
      const fetched = async () => {
        const fetchedData = await fetch(
          `https://amasong-88ebb-default-rtdb.firebaseio.com/products/${p.id}/selled/.json`
        )
          .then((res) => res.json())
          .then((data) => {
            fetch(
              `https://amasong-88ebb-default-rtdb.firebaseio.com/products/${p.id}.json`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  selled: data + 1,
                }),
              }
            );
          });
      };
      fetched();
      addProductsToUser(id, carrito)
      dispatch(clearCart())
      navigate("/");
    });
  };
  return (
    <div className="fullCartContainer">
      {carrito.map((p) => (
        <FullCartProduct
          key={p.id}
          name={p.name}
          imgR={p.img}
          price={p.price}
          quantity={p.quantity}
        />
      ))}
      <h4>Total: {totalPrice}</h4>
      <button onClick={()=>buy()} className="buyButton">Realizar Pedido</button>
    </div>
  );
};
