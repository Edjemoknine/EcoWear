"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { runConfetti } from "@/lib/Confetti";
import { ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Success = () => {
  const { setCartProducts } = useCart();
  useEffect(() => {
    localStorage.clear();
    setCartProducts([]);
    runConfetti();
  }, [setCartProducts]);

  return (
    <div className="grid place-items-center  ">
      <div className="max-w-xl grid place-items-center mt-16 min-h-[40vh] gap-6 text-center w-full p-6 rounded-md bg-gray-200">
        <ShoppingBag className="text-primary" size={70} />
        <h1 className="text-4xl font-bold">Congartulations</h1>
        <p className="text-2xl  text-gray-500">
          Your Payment is Done Successfully!
        </p>
        <Button>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
