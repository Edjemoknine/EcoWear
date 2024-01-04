"use client";
import { productDetail } from "@/Type/type";
import { createContext, useEffect, useContext, useState } from "react";

export const MyContext = createContext();

// const getLocalCart = () => {
//   const oldCart: product[] = localStorage.getItem("cart") || [];
//   return oldCart;
// };
const CartContext = ({ children }: { children: any }) => {
  const [cartProducts, setCartProducts] = useState<productDetail[]>([]);
  const [open, setOpen] = useState(false);
  console.log(cartProducts);

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cartProducts));
  //   }, [cartProducts]);

  const addToCart = (pro: productDetail) => {
    let check = cartProducts.some((product) => product.slug === pro.slug);
    console.log(check);
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

  const ClearCart = () => {
    setCartProducts([]);
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
        ClearCart,
        removeFrCart,
        cartProducts,
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
