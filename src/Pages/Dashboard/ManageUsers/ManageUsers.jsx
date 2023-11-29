import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaUserEdit } from "react-icons/fa";


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();

    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/users');
            return res.data;
        }

    });

    return (
        <div>
            <h2 className="text-2xl font-bold text-teal-500 text-center">All Users</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Make Admin</Table.HeadCell>
                    <Table.HeadCell>Subscription Status</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {users.map(user => <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </Table.Cell>
                        <Table.Cell>user.email</Table.Cell>
                        <Table.Cell><Button><FaUserEdit className="text-white text-xl"></FaUserEdit></Button></Table.Cell>
                        {user.badge === 'Bronze' &&
                            <Table.Cell>No</Table.Cell>
                        }
                        {user.badge === 'Gold' &&
                            <Table.Cell>Yes</Table.Cell>
                        }
                    </Table.Row>)
                        
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export default ManageUsers;