import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateReview = () => {

    const review = useLoaderData();
    const { _id, title, image, myReview } = review;
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        const newReview = e.target.review.value;
        const updateInfo = { newReview };

        axiosPublic.patch(`/allReviews/${_id}`, updateInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'You have edited your review',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myReviews')
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | Update Review</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">You are Editing review of {title}</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <div>
                <img src={image} alt="" className="w-96 h-60 mx-auto border" />
            </div>
            <form onSubmit={handleEdit}>
                <div className="w-1/2 mx-auto mt-6">
                    <h2 className="text-teal-500 text-2xl font-semibold text-center">Review:</h2>
                    <textarea name="review" cols="60" rows="2" defaultValue={myReview}></textarea>
                </div>
                <div className="w-fit mx-auto">
                    <input type="submit" value="Edit" className="bg-teal-600 px-10 py-2 text-white font-semibold rounded-md" />
                </div>

            </form>
        </div>
    );
};

export default UpdateReview;