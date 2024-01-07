"use client";
import { productDetail } from "@/Type/type";
import { createContext, useEffect, useContext, useState } from "react";

export const MyContext = createContext();

const getLocalCart = () => {
  const oldCart = JSON.parse(localStorage.getItem("sanity")) || [];
  if (oldCart) return oldCart;
};
const CartContext = ({ children }: { children: any }) => {
  const [cartProducts, setCartProducts] = useState(getLocalCart());
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("sanity", JSON.stringify(cartProducts));
    setTotal(
      cartProducts.reduce((acc, item) => acc + item.quantity * item.Price, 0)
    );
  }, [cartProducts]);

  const addToCart = (pro: productDetail) => {
    let check = cartProducts.some((product) => product.slug === pro.slug);

    if (check === true) {
      setCartProducts([
        ...cartProducts.map(
          (product: any) =>
            product.slug === pro.slug && {
              ...product,
              quantity: product.quantity + 1,
            }
        ),
      ]);
    } else {
      setCartProducts([...cartProducts, { ...pro, quantity: 1 }]);
    }
  };

  const removeFrCart = (slug: string) => {
    setCartProducts(cartProducts.filter((pro) => pro.slug !== slug));
  };

  const decreaseQuan = (pro: productDetail) => {
    setCartProducts([...cartProducts, { ...pro, quantity: pro.quantity - 1 }]);
  };

  return (
    <MyContext.Provider
      value={{
        addToCart,
        open,
        setOpen,
        decreaseQuan,
        removeFrCart,
        cartProducts,
        total,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default CartContext;

export const useCart = () => {
  return useContext(MyContext);
};
