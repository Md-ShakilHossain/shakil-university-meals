import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Membership = () => {

    const axiosPublic = useAxiosPublic();

    const {data: packages=[]} = useQuery({
        queryKey: ['package'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/package');
            return res.data;
        }
    });

    return (
        <div className="w-4/5 mx-auto mb-20">
            <h2 className="text-4xl text-teal-500 font-bold text-center">Membership</h2>
            <hr className="w-1/2 mx-auto mb-2 mt-4 border-t-2 border-solid border-black" />
            <h4 className="text-2xl text-orange-400 font-bold text-center">Upgrade to Premium</h4>
            <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    packages.map(pack =><div key={pack._id} className="card bg-gray-200 h-60 p-8 rounded-md mb-8">
                    <h3 className="text-2xl uppercase font-semibold text-center mb-4">{pack.name}</h3>
                    <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
                    <p className="text-gray-700 text-center mt-4">Access to {pack.mealType} meals</p>
                    <p className="text-green-600 text-center font-bold">${pack.price}/month</p>
                    <Link to={`/checkout/${pack.name}`}><Button className="w-full uppercase mt-6">Upgrade to {pack.name}</Button></Link>
                </div> )
                }
                </div>
        </div>
    );
};

export default Membership;