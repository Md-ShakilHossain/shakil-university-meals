import { Rating } from "@smastrom/react-rating";
import { Button } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";




const MealDetails = () => {

    const item = useLoaderData();
    const { user } = useAuth();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const { image, title, adminName, description, ingredients, time, rating, reviews, likes, _id } = item;

    const { data: singleUser = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user.email}`);
            return res.data;
        }
    });
    const badge = singleUser[0]?.badge;
    console.log(badge);


    const handleMealRequest = async () => {


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
                    navigate("/login", { state: { from: location } });
                }
            });
            return;
        }

        if (user && badge !== "Gold") {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "You have to purchase a package from membership section",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
            return;
        }
        if (user && badge === "Gold") {
            const mealInfo = {
                mealId: _id,
                title: title,
                likes: likes,
                reviews: reviews,
                status: "pending",
                requestedEmail: user.email,
                requestedName: user.displayName
            };

            const res = await axiosPublic.post('/requestedMeal', mealInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have requested the meal successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
            }

        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        const review = e.target.review.value;

        const reviewInfo = {
            mealId: _id,
            title: title,
            likes: likes,
            myReview: review,
            image: image,
            reviews: reviews,
            userEmail: user?.email,
            userName: user?.displayName
        };
        if(!user){
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
                    navigate("/login", { state: { from: location } });
                }
            });
            return;
        }

        if (user) {
            const reviewRes = await axiosPublic.post('/allReviews', reviewInfo);
            if (reviewRes.data.insertedId) {
                e.target.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Review Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
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

                    <p><span className="text-xl font-semibold">Likes:</span> {likes}</p>
                    <p><span className="text-xl font-semibold">Reviews:</span> {reviews}</p>

                    <div className="flex justify-evenly my-4">
                        <Link ><Button
                            onClick={handleMealRequest}
                            className="w-fit">Request the Meal</Button></Link>

                        <Button><FaThumbsUp className="text-2xl"></FaThumbsUp></Button>
                    </div>
                    <div>
                        <h3 className="text-2xl text-teal-500 font-semibold my-2">Add Your Review:</h3>
                        <form onSubmit={handleAddReview}>
                            <textarea name="review" id="" cols="90" rows="2"></textarea>

                            <input type="submit" value="Add" className="px-10 py-2 bg-teal-600 mb-4 rounded-md text-white font-semibold" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;