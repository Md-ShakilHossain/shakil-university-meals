import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";


const UpcomingMeals = () => {

    const axiosSecure = useAxiosSecure();

    const { data: upcomingMeal = [] } = useQuery({
        queryKey: ['upcomingMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcomingMeal');
            return res.data;
        }
    });

    return (
        <div>
            <Helmet>
                <title>S.U_MeaLs | Upcoming Meals</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-teal-500 text-center">Upcoming Meals</h2>
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
                    <Table.HeadCell>Publish</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {upcomingMeal.map(meal => <Table.Row key={meal._id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {meal.title}
                        </Table.Cell>

                        <Table.Cell>{meal.likes}</Table.Cell>

                        <Table.Cell>{meal.reviews}</Table.Cell>
                        <Table.Cell>{meal.adminName}</Table.Cell>
                        <Table.Cell>{meal.adminEmail}</Table.Cell>
                        
                        <Table.Cell><Button>Publish</Button></Table.Cell>


                    </Table.Row>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export default UpcomingMeals;