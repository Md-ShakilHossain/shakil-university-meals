import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
//  add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const pack = useLoaderData();
    const{name, price, mealType} = pack;

    return (
        <div className="mt-20 w-4/5 mx-auto">
            <h3 className="text-teal-500 font-bold text-2xl text-center">You are paying ${price} for the package {name}</h3>
            <p className="mb-10 text-center mt-4 text-xl font-semibold">You will get {mealType} types of meal.</p>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} name={name}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;