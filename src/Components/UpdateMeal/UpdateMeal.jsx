import { Card } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateMeal = () => {

    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const meal = useLoaderData();

    const { title, category, image, ingredients, description, price, rating, likes, reviews, adminName, adminEmail, _id } = meal;

    const getCurrentDateTime = () => {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    };

    const onSubmit = async (data) => {
        const mealItem = {
            title: data.title,
            category: data.category,
            image: data.image,
            ingredients: data.ingredients,
            description: data.description,
            price: parseFloat(data.price),
            rating: data.rating,
            likes: data.likes,
            reviews: data.reviews,
            adminName: data.adminName,
            adminEmail: data.adminEmail
        }

        console.log(mealItem);

        const mealRes = await axiosSecure.patch(`/meal/${_id}`, mealItem);
        if (mealRes.data.modifiedCount > 0) {
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is updated to the meal`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | Update</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">You are Updating {title}</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <Card >
                <form onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="flex gap-6 justify-between">
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Meal Title</span>
                            </label>
                            <input type="text"
                                {...register('title', { required: true })}
                                defaultValue={title}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Meal Category</span>
                            </label>
                            <select defaultValue={category}
                                {...register("category", { required: true })}
                                className="select select-bordered rounded-md w-96">

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
                                defaultValue={image}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Ingredients</span>
                            </label>
                            <input type="text"
                                {...register('ingredients', { required: true })}
                                defaultValue={ingredients}
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
                                defaultValue={description}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number"
                                {...register('price', { required: true })}
                                defaultValue={price}
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
                                defaultValue={rating}
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
                                defaultValue={likes}
                                readOnly
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">Reviews</span>
                            </label>
                            <input type="number"
                                defaultValue={reviews}
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
                                defaultValue={adminName}
                                readOnly
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text">AdminEmail</span>
                            </label>
                            <input type="email"
                                defaultValue={adminEmail}
                                readOnly
                                {...register('adminEmail', { required: true })}
                                className="input input-bordered rounded-md mt-2 w-96" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="bg-teal-500 px-10 py-2 text-white font-semibold rounded-md">
                            Update
                        </button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default UpdateMeal;