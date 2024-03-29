"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import Checkout from "./Checkout";
import { productDetail } from "@/Type/type";

const Purchase = ({ product }: { product: productDetail }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex gap-2.5">
      <Button onClick={() => addToCart(product)} variant={"outline"}>
        Add To Cart
      </Button>

      <Checkout products={[{ ...product, quantity: 1 }]} />
    </div>
  );
};

export default Purchase;
