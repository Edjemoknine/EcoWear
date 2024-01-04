"use client"
import { ReactNode } from "react"
import { CartProvider as USCProvider } from "use-shopping-cart"

const Provider = ({children}:{children:ReactNode}) => {
  return (
    <USCProvider 
    mode="payment"
    cartMode="client-only"
    stripe={process.env.NEXT_PAYMENT_KEY as string}
    successUrl="http://localhost:3000/success"
    cancelUrl="http://localhost:3000/errro"
    currency="USD"
    billingAddressCollection={true}
    shouldPersist={true}
    Language="en-US"
    >
    {children}
    
    </USCProvider>
  )
}

export default Provider