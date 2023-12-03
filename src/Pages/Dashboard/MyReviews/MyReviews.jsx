import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { Button, Table } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyReviews = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const { data: userReviews = [], refetch } = useQuery({
        queryKey: ['userReviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allReviews?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/allReviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your review has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | My Reviews</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">Your All Reviews</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <Table>
                <Table.Head>
                    <Table.HeadCell>Meal Title</Table.HeadCell>
                    <Table.HeadCell>Likes Count</Table.HeadCell>
                    <Table.HeadCell>Reviews Count</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>View Meal</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {userReviews.map(review => <Table.Row key={review._id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {review.title}
                        </Table.Cell>

                        <Table.Cell>{review.likes}</Table.Cell>

                        <Table.Cell>{review.reviews}</Table.Cell>
                       
                        <Table.Cell><Link to={`/dashboard/updateReview/${review._id}`}><Button><FaEdit></FaEdit></Button></Link></Table.Cell>
                        <Table.Cell><Button onClick={() => handleDelete(review._id)}><FaTrash></FaTrash></Button></Table.Cell>
                        <Table.Cell><Link to={`/meal/${review.mealId}`}><Button>Details</Button></Link></Table.Cell>


                    </Table.Row>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export default MyReviews;