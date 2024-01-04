"use client";

import { product, productDetail } from "@/Type/type";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
const Cart = () => {
  const { cartProducts, open, setOpen } = useCart();
  console.log(cartProducts);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex justify-between flex-col">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-3">
              {cartProducts.map((product: productDetail) => (
                <div className="flex items-center gap-10" key={product._id}>
                  <div>
                    <Image
                      src={urlFor(product.image[0]).url()}
                      alt="product"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
