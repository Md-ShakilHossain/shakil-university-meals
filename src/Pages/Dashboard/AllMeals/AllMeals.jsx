import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AllMeals = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allMeals = [], refetch } = useQuery({
        queryKey: ['allMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meal');
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
                axiosSecure.delete(`/meal/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
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
                <title>S.U_MeaLs | All Meals</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">All Meals</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Likes</Table.HeadCell>
                    <Table.HeadCell>Reviews</Table.HeadCell>
                    <Table.HeadCell>Distributor Name</Table.HeadCell>
                    <Table.HeadCell>Distributor Email</Table.HeadCell>
                    <Table.HeadCell>Update</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>View Meal</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {allMeals.map(meal => <Table.Row key={meal._id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {meal.title}
                        </Table.Cell>

                        <Table.Cell>{meal.likes}</Table.Cell>

                        <Table.Cell>{meal.reviews}</Table.Cell>
                        <Table.Cell>{meal.adminName}</Table.Cell>
                        <Table.Cell>{meal.adminEmail}</Table.Cell>
                        <Table.Cell><Link to={`/dashboard/updateMeal/${meal._id}`}><Button><FaEdit></FaEdit></Button></Link></Table.Cell>
                        <Table.Cell><Button onClick={() => handleDelete(meal._id)}><FaTrash></FaTrash></Button></Table.Cell>
                        <Table.Cell><Link to={`/meal/${meal._id}`}><Button>Details</Button></Link></Table.Cell>


                    </Table.Row>)
                    }
                </Table.Body>
            </Table>

        </div>
    );
};

export default AllMeals;