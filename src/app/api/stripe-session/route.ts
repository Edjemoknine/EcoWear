
import { NextRequest,NextResponse } from "next/server";
import Stripe from "stripe";

const Key= process.env.STRIPE_SECRET_KEY || "";

const stripe= new Stripe(Key,{
apiVersion:"2023-10-16"
})

export const POST =async(request:NextRequest)=>{


    const body=await request.json();

    if(body.length < 0) return NextResponse.json({"error":"invalid data"})
    
  try {
    const session = await stripe.checkout.sessions.create({
        submit_type:'pay',
        mode: 'payment',
        payment_method_types:['card'],
        billing_address_collection:"auto",
        line_items:body.map((item:any)=>{
            return{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:item.Price*100,
                },
                 adjustable_quantity: {
                    enabled: true,
                    minimum:1
                },
                quantity:item.quantity
            }
        }),
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });

      return NextResponse.json({session})
      
    } catch (error:any) {
      console.log("Error Route.....")
      return NextResponse.json({
        e:error.message
      })
  }

}