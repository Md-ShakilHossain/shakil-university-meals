import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaUserEdit } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [userByEmail, setUserByEmail] = useState(null);
    const [usersByName, setUsersByName] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }

    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleSearchByEmail = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        console.log(email);
        axiosSecure.get(`/users?email=${email}`)
        .then(res => {
            setUserByEmail(res.data);
            setUsersByName(null);
            form.reset();
        } )
        .catch(error => {
            console.log(error);
        })
    };
    const handleSearchByName = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        console.log(name);
        axiosSecure.get(`/users?name=${name}`)
        .then(res => {
            setUsersByName(res.data);
            setUserByEmail(null);
            form.reset();
        } )
        .catch(error => {
            console.log(error);
        })
    };
    console.log(usersByName);
    

    return (
        <div>
            <h2 className="text-2xl font-bold text-teal-500 text-center">All Users</h2>
            <br />
            <hr className="w-1/2 mx-auto border-t-2 border-solid border-black" />
            <br />
            <div className="flex justify-between">
                <div>
                    <form onSubmit={handleSearchByEmail} >
                        <p className="text-xl font-semibold mb-2">Search By Email:</p>
                        <input type="email" name="email" placeholder="Email Here" />
                        <input type="submit" value="Search" className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-r-2xl" />
                    </form>
                </div>
                <div>
                    <form onSubmit={handleSearchByName}>
                        <p className="text-xl font-semibold mb-2">Search By Name:</p>
                        <input type="text" name="name" placeholder="Name Here" />
                        <input type="submit" value="Search" className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-r-2xl" />
                    </form>
                </div>
            </div>
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
                    {
                        userByEmail && 
                        userByEmail.map(user => <Table.Row key={user._id}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </Table.Cell>

                        <Table.Cell>{user.email}</Table.Cell>

                        <Table.Cell>
                            {user.role === 'admin' ? 'admin' :
                                <Button
                                    onClick={() => handleMakeAdmin(user)}
                                ><FaUserEdit className="text-white text-xl"></FaUserEdit></Button>
                            }
                        </Table.Cell>

                        {user.badge === 'Bronze' &&
                            <Table.Cell>No</Table.Cell>
                        }
                        {user.badge === 'Gold' &&
                            <Table.Cell>Yes</Table.Cell>
                        }

                        </Table.Row>)
                    }

                    {
                        usersByName && 
                        usersByName.map(user => <Table.Row key={user._id}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </Table.Cell>

                        <Table.Cell>{user.email}</Table.Cell>

                        <Table.Cell>
                            {user.role === 'admin' ? 'admin' :
                                <Button
                                    onClick={() => handleMakeAdmin(user)}
                                ><FaUserEdit className="text-white text-xl"></FaUserEdit></Button>
                            }
                        </Table.Cell>

                        {user.badge === 'Bronze' &&
                            <Table.Cell>No</Table.Cell>
                        }
                        {user.badge === 'Gold' &&
                            <Table.Cell>Yes</Table.Cell>
                        }

                        </Table.Row>)
                    }

                    {!userByEmail && !usersByName &&
                    users.map(user => <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </Table.Cell>

                        <Table.Cell>{user.email}</Table.Cell>

                        <Table.Cell>
                            {user.role === 'admin' ? 'admin' :
                                <Button
                                    onClick={() => handleMakeAdmin(user)}
                                ><FaUserEdit className="text-white text-xl"></FaUserEdit></Button>
                            }
                        </Table.Cell>

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