import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


const Membership = () => {
    return (
        <div className="w-4/5 mx-auto mb-20">
            <h2 className="text-4xl text-teal-500 font-bold text-center">Membership</h2>
            <hr className="w-1/2 mx-auto mb-2 mt-4 border-t-2 border-solid border-black" />
            <h4 className="text-2xl text-orange-400 font-bold text-center">Upgrade to Premium</h4>
            <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Silver Membership Card */}
                <div className="card bg-gray-200 h-60 p-8 rounded-md mb-8">
                    <h3 className="text-2xl font-semibold text-center mb-4">Silver</h3>
                    <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
                    <p className="text-gray-700 text-center mt-4">Access to basic meals</p>
                    <p className="text-green-600 text-center font-bold">$50/month</p>
                    <Link to="/checkout/silver"><Button className="w-full mt-6">Upgrade to Silver</Button></Link>
                </div>
                {/* Gold Membership Card */}
                <div className="card bg-orange-300 h-60 p-8 rounded-md mb-8">
                    <h3 className="text-2xl text-center font-semibold mb-4">Gold</h3>
                    <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
                    <p className="text-gray-700 text-center mt-4">Access to standard meals</p>
                    <p className="text-yellow-800 text-center font-bold">$80/month</p>
                    <Link to="/checkout/gold"><Button className="w-full mt-6">Upgrade to Gold</Button></Link>
                </div>

                {/* Platinum Membership Card */}
                <div className="card bg-teal-100 p-8 h-60 rounded-md">
                    <h3 className="text-2xl text-center font-semibold mb-4">Platinum</h3>
                    <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
                    <p className="text-gray-700 text-center mt-4">Access to premium meals</p>
                    <p className="text-blue-800 text-center font-bold">$120/month</p>
                    <Link to="/checkout/platinum"><Button className="w-full mt-6">Upgrade to Platinum</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default Membership;