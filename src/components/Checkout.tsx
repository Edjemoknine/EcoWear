"use client";

import getStripe from "@/lib/stripe";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { productDetail } from "@/Type/type";

const Checkout = ({ products }: { products: productDetail[] }) => {
  const { isAuthenticated } = useKindeBrowserClient();
  const router = useRouter();
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push("/api/auth/login");
      return false;
    } else {
      const stripe = await getStripe();

      const response = await fetch("http://localhost:3000/api/stripe-session", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });

      const data = await response.json();

      if (data.session) {
        stripe?.redirectToCheckout({ sessionId: data.session.id });
      }
    }
  };

  return (
    <div>
      {/* <> */}
      <Button className="w-full" variant={"default"} onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default Checkout;
