import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";


const UpcomingMeal = () => {

    const axiosPublic = useAxiosPublic();

    const {data: upcoming=[]} = useQuery({
        queryKey:['upcoming'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        }
    });

    return (
        <div className="w-4/5 mx-auto mt-16">
            <Helmet>
                <title>S.U_MeaLs | Upcoming Meal</title>
            </Helmet>

            <Table>
                <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Likes</Table.HeadCell>
                    <Table.HeadCell>Reviews</Table.HeadCell>
                    <Table.HeadCell>Distributor Name</Table.HeadCell>
                    <Table.HeadCell>Distributor Email</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {upcoming.map(meal => <Table.Row key={meal._id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {meal.title}
                        </Table.Cell>
                        <Table.Cell>{meal.likes}</Table.Cell>
                        <Table.Cell>{meal.reviews}</Table.Cell>
                        <Table.Cell>{meal.adminName}</Table.Cell>
                        <Table.Cell>{meal.adminEmail}</Table.Cell>
                    </Table.Row>)
                    }
                </Table.Body>
            </Table>
                
        </div>
    );
};

export default UpcomingMeal;