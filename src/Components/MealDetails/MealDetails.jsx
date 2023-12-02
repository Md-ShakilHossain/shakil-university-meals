import { Rating } from "@smastrom/react-rating";
import { Button } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const MealDetails = () => {

    const item = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    
    const { image, title, adminName, description, ingredients, time, rating, reviews } = item;

    const handleMealRequest = () => {
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
                    navigate("/login", { state: { from: location} });
                }
            });
        }
    }

    return (
        <div className="w-4/5 mx-auto mt-12">
            <h2 className="text-3xl text-teal-500 text-center font-bold" >Details of meal: <span className="text-orange-400">{title}</span></h2>
            <div className="border border-orange-400 mt-10">
                <div className="flex justify-center items-center">
                    <img className="w-[700px] h-96 border rounded-md" src={image} alt="" />
                </div>

                <div className="w-[700px] mx-auto">
                    <p className="text-xl font-semibold mt-6">Admin: {adminName}</p>

                    <p><span className="text-xl font-semibold">Description:</span> {description}</p>

                    <p><span className="text-xl font-semibold">Description:</span> {ingredients}</p>

                    <p><span className="text-xl font-semibold">Post Time:</span> {time}</p>

                    <div className="flex">
                        <p className="text-xl font-semibold mr-5">Rating:</p>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={rating}
                            readOnly
                        />
                    </div>

                    <p><span className="text-xl font-semibold">Reviews:</span> {reviews}</p>

                    <div className="flex justify-evenly my-4">
                        <Link ><Button
                            onClick={handleMealRequest}
                            className="w-fit">Request the Meal</Button></Link>

                        <Button><FaThumbsUp className="text-2xl"></FaThumbsUp></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;