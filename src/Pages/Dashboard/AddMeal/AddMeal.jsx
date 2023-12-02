import { Button, Card } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddMeal = () => {

    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();


    const getCurrentDateTime = () => {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    };

    const handleAddMeal = async (data) => {
        const title = data.title;
        const category = data.category;
        const image = data.image;
        const ingredients = data.ingredients;
        const description = data.description;
        const price = data.price;
        const rating = data.rating;
        const time = data.time;
        const likes = data.likes;
        const reviews = data.reviews;
        const adminName = data.adminName;
        const adminEmail = data.adminEmail;

        const mealInfo = {
            title,
            category,
            image,
            ingredients,
            description,
            price,
            rating,
            time,
            likes,
            reviews,
            adminName,
            adminEmail
        };
        console.log(mealInfo);
        const mealRes = await axiosSecure.post('/meal', mealInfo);
        if (mealRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${title} is added to the meal`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    const handleAddToUpcoming = async (data) => {
        const title = data.title;
        const category = data.category;
        const image = data.image;
        const ingredients = data.ingredients;
        const description = data.description;
        const price = data.price;
        const rating = data.rating;
        const time = data.time;
        const likes = data.likes;
        const reviews = data.reviews;
        const adminName = data.adminName;
        const adminEmail = data.adminEmail;

        const mealInfo = {
            title,
            category,
            image,
            ingredients,
            description,
            price,
            rating,
            time,
            likes,
            reviews,
            adminName,
            adminEmail
        };

        console.log(mealInfo);
        const mealRes = await axiosSecure.post('/upcomingMeal', mealInfo);
        if (mealRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${title} is added to the Upcoming Meal`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | Add Meal</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">Add a Meal</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <Card >
                <form className="card-body">
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Meal Title</span>
                            </label>
                            <input type="text"
                                {...register('title', { required: true })}
                                placeholder="Meal Title"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Meal Category</span>
                            </label>
                            <select defaultValue="default" {...register("category", { required: true })}
                                className="select select-bordered rounded-md w-96">
                                <option disabled value="default">Select a category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input type="text"
                                {...register('image', { required: true })}
                                placeholder="Image URL"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Ingredients</span>
                            </label>
                            <input type="text"
                                {...register('ingredients', { required: true })}
                                placeholder="Ingredients"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text"
                                {...register('description', { required: true })}
                                placeholder="Description"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number"
                                {...register('price', { required: true })}
                                placeholder="Price"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="number"
                                {...register('rating', { required: true })}
                                placeholder="1-5"
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Post Time</span>
                            </label>
                            <input type="text"
                                defaultValue={getCurrentDateTime()}
                                readOnly
                                {...register('time', { required: true })}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Likes</span>
                            </label>
                            <input type="number"
                                {...register('likes', { required: true })}
                                defaultValue={0}
                                readOnly
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Reviews</span>
                            </label>
                            <input type="number"
                                defaultValue={0}
                                readOnly
                                {...register('reviews', { required: true })}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Admin Name</span>
                            </label>
                            <input type="text"
                                {...register('adminName', { required: true })}
                                defaultValue={user.displayName}
                                readOnly
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">AdminEmail</span>
                            </label>
                            <input type="email"
                                defaultValue={user.email}
                                readOnly
                                {...register('adminEmail', { required: true })}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>

                    <div className="flex gap-6 justify-between mt-10">
                        <div>
                            <Button
                                onClick={handleSubmit(handleAddMeal)}
                                className="w-96"
                            >
                                Add Meal
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={handleSubmit(handleAddToUpcoming)}
                                className="w-96"
                            >
                                Add to Upcoming
                            </Button>
                        </div>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default AddMeal;