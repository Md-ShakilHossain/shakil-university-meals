import { Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Meals = () => {

    const axiosPublic = useAxiosPublic();

    const {data: meals=[]} = useQuery({
        queryKey:['meals'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/meal');
            return res.data;
        }
    });

    return (
        <div className="w-4/5 mx-auto mt-16">
            <Helmet>
                <title>S.U_MeaLs | Meals</title>
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
                    {meals.map(meal => <Table.Row key={meal._id}>
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

export default Meals;