"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";

const Purchase = ({ product }) => {
  const { addToCart, cartProducts } = useCart();
  console.log(cartProducts);
  return (
    <div className="flex gap-2.5">
      <Button onClick={() => addToCart(product)} variant={"outline"}>
        Add To Cart
      </Button>
      <Button variant={"default"}>Checkout Now</Button>
    </div>
  );
};

export default Purchase;
