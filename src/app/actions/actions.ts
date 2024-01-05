"use server"

import { productDetail } from "@/Type/type"
import { redirect } from "next/navigation";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutOrder=async(product:any)=>{
    console.log(product);
try {
    
     const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    currency:'usd',
                    unit_amount:Number(product.Price)*100,
                    product_data:{
                        name:product.name
                    }
                },
                quantity:1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
      redirect(session.url!)
} catch (error) {
    console.error(error,"there is an error")
    throw error
}
}