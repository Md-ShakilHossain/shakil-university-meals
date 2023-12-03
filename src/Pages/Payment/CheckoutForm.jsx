import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';


const CheckoutForm = ({ price, name }) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const totalPrice = price;
   

    const { data: singleUser = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            Swal.fire({
                title: "Login Require",
                text: "To request a meal you need to login first",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok, Login First"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: {from: location} });
                }
            });
        }

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment Error', error);
            setError(error.message);
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError);
        }
        else {
            console.log('paymentIntent', paymentIntent);
            setTransactionId(paymentIntent.id)
        }
        // now set package for the users
        const id = singleUser.map(user=>user._id);

        axiosPublic.patch(`/users/${id}`, {name})
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `You have Purchased ${name} package `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })


    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="bg-teal-600 px-10 py-2 rounded-md text-white font-semibold mt-6" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-xl text-red-600">{error}</p>
            {transactionId && <p className="text-xl text-green-600">your transactionId is {transactionId}</p>}
        </form>
    );
};

CheckoutForm.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string
}

export default CheckoutForm;