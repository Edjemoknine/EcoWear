"use client";
import { productDetail } from "@/Type/type";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type Props = {
  addToCart: (pro: productDetail) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  decreaseQuan: (pro: productDetail) => void;
  removeFrCart: (slug: string) => void;
  cartProducts: any;
  setCartProducts: Dispatch<SetStateAction<[]>>;
  total: number;
};
export const MyContext = createContext<Props>({
  addToCart: (pro: productDetail) => {},
  open: false,
  setOpen: () => {},
  decreaseQuan: () => {},
  removeFrCart: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  total: 0,
});

const getLocalCart = () => {
  const oldCart = JSON.parse(window.localStorage.getItem("sanity")!) || [];
  if (oldCart) return oldCart;
};
const CartContext = ({ children }: { children: any }) => {
  const [cartProducts, setCartProducts] = useState(getLocalCart());
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.localStorage.setItem("sanity", JSON.stringify(cartProducts));
    setTotal(
      cartProducts.reduce(
        (acc: any, item: any) => acc + item.quantity * item.Price,
        0
      )
    );
  }, [cartProducts]);

  const addToCart = (pro: productDetail) => {
    let check: boolean = cartProducts.some(
      (product: any) => product.slug === pro.slug
    );

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
    setCartProducts(
      cartProducts.filter((pro: productDetail) => pro.slug !== slug)
    );
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
        setCartProducts,
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
