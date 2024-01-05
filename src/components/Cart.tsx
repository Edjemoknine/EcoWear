"use client";

import { productDetail } from "@/Type/type";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Checkout from "./Checkout";
const Cart = () => {
  const { cartProducts, open, setOpen, removeFrCart, total } = useCart();
  // console.log(process.env.NEXT_APP_STRIPE_KEY);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-[95%]  flex justify-between flex-col">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-3">
              {cartProducts.map((product: productDetail) => (
                <div className="flex gap-6" key={product._id}>
                  <div className="h-24 w-24 flex justify-between shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={urlFor(product.image[0]).url()}
                      alt="product"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{product.name}</h3>
                        <p>${product.Price}</p>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm line-clamp-2 ">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm">
                      <p>QTY: {product.quantity}</p>
                      <div className="flex">
                        <button
                          onClick={() => removeFrCart(product.slug)}
                          className="text-primary font-medium hover:text-primary/80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${total}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shopping and texes are calculated at checkout
            </p>
            <div className="mt-6">
              <Checkout products={cartProducts} />
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => setOpen(false)}
                  className="font-medium text-primary"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
