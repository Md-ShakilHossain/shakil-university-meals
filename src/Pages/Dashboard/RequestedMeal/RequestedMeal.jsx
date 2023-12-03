import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { Button, Table } from "flowbite-react";
import { RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";


const RequestedMeal = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: requestMeal = [], refetch } = useQuery({
        queryKey: ['requestMeal'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/requestedMeal/${user?.email}`);
            return res.data;
        }
    });

    const sortedRequestedMeals = requestMeal.slice().sort((a, b) => {
        if (a.status === "pending" && b.status === "delivered") {
            return -1;
        } else if (a.status === "delivered" && b.status === "pending") {
            return 1;
        } else {
            return 0;
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
                axiosPublic.delete(`/requestedMeal/${id}`)
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
                <title>S.U_MeaLs | Requested Meal</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">Your Requested Meal</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />

            <Table>
                <Table.Head>
                    <Table.HeadCell>Meal Title</Table.HeadCell>
                    <Table.HeadCell>Likes Count</Table.HeadCell>
                    <Table.HeadCell>Reviews Count</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Cancel</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {sortedRequestedMeals.map(meal => <Table.Row key={meal._id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {meal.title}
                        </Table.Cell>

                        <Table.Cell>{meal.likes}</Table.Cell>

                        <Table.Cell>{meal.reviews}</Table.Cell>
                        <Table.Cell>{meal.status}</Table.Cell>

                        <Table.Cell><Button onClick={() => handleDelete(meal._id)}><RxCrossCircled className="text-3xl text-red-500"></RxCrossCircled></Button></Table.Cell>
                        


                    </Table.Row>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export default RequestedMeal;