import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { Button, Card } from "flowbite-react";
import {  useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MealsByCategory = () => {
    const axiosPublic = useAxiosPublic();
    const [activeTab, setActiveTab] = useState(0);

    const {data: menu=[]} = useQuery({
        queryKey: ['menu'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/meal');
            return res.data;
        }
    });
    

    const breakfast = menu.filter(item => item.category === 'breakfast');
    const lunch = menu.filter(item => item.category === 'lunch');
    const dinner = menu.filter(item => item.category === 'dinner');

    const handleTabSelect = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="mt-20">
            <h2 className="text-teal-600 text-3xl font-bold text-center mb-10">Meals By Category</h2>
            <Tabs>
                <TabList className='bg-gray-800 md:bg-gradient-to-r from-gray-200 via-gray-800 to-gray-200 py-4 text-gray-800 font-bold lg:text-xl'>
                    <div className="flex gap-2 md:gap-6 lg:gap-8 justify-center bg-white w-fit mx-auto px-4 md:px-8 py-2 rounded-3xl shadow-2xl">
                        <Tab
                            className={`cursor-pointer ${activeTab === 0 ? 'underline text-rose-500' : ''}`}
                            onClick={() => handleTabSelect(0)}
                        >
                            All Meals
                        </Tab>
                        <Tab
                            className={`cursor-pointer ${activeTab === 1 ? 'underline text-rose-500' : ''}`}
                            onClick={() => handleTabSelect(1)}
                        >
                            Breakfast
                        </Tab>
                        <Tab
                            className={`cursor-pointer ${activeTab === 2 ? 'underline text-rose-500' : ''}`}
                            onClick={() => handleTabSelect(2)}
                        >
                            Lunch
                        </Tab>
                        <Tab
                            className={`cursor-pointer ${activeTab === 3 ? 'underline text-rose-500' : ''}`}
                            onClick={() => handleTabSelect(3)}
                        >
                            Dinner
                        </Tab>
                    </div>

                </TabList>
                <div className="w-4/5 mx-auto">
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                            {
                                menu.map(item => <Card
                                    className="w-72 md:w-80   shadow-2xl"
                                    key={item._id}>

                                    <img className="border h-52 rounded-b-3xl" src={item.image} />

                                    <h4 className="text-teal-600 text-center font-bold">{item.title}</h4>

                                    <Rating
                                        style={{ maxWidth: 100, marginLeft: 80 }}
                                        value={item.rating}
                                        readOnly
                                    />

                                    <p className="font-bold text-center">Price: ${item.price}</p>


                                    <Link to={`/meal/${item._id}`}><Button className="w-full">Details</Button></Link>

                                </Card>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {
                                breakfast.map(item => <Card
                                    className="w-72 md:w-80   shadow-2xl"
                                    key={item._id}>

                                    <img className="border h-52 rounded-b-3xl" src={item.image} />

                                    <h4 className="text-teal-600 text-center font-bold">{item.title}</h4>

                                    <Rating
                                        style={{ maxWidth: 100, marginLeft: 80 }}
                                        value={item.rating}
                                        readOnly
                                    />

                                    <p className="font-bold text-center">Price: ${item.price}</p>

                                    <Link to={`/meal/${item._id}`}><Button className="w-full">Details</Button></Link>

                                </Card>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {
                                lunch.map(item => <Card
                                    className="w-72 md:w-80   shadow-2xl"
                                    key={item._id}>

                                    <img className="border h-52 rounded-b-3xl" src={item.image} />

                                    <h4 className="text-teal-600 text-center font-bold">{item.title}</h4>

                                    <Rating
                                        style={{ maxWidth: 100, marginLeft: 80 }}
                                        value={item.rating}
                                        readOnly
                                    />

                                    <p className="font-bold text-center">Price: ${item.price}</p>

                                    <Link to={`/meal/${item._id}`}><Button className="w-full">Details</Button></Link>

                                </Card>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            {
                                dinner.map(item => <Card
                                    className="w-72 md:w-80   shadow-2xl"
                                    key={item._id}>

                                    <img className="border h-52 rounded-b-3xl" src={item.image} />

                                    <h4 className="text-teal-600 text-center font-bold">{item.title}</h4>

                                    <Rating
                                        style={{ maxWidth: 100, marginLeft: 80 }}
                                        value={item.rating}
                                        readOnly
                                    />

                                    <p className="font-bold text-center">Price: ${item.price}</p>

                                    <Link to={`/meal/${item._id}`}><Button className="w-full">Details</Button></Link>

                                </Card>)
                            }
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default MealsByCategory;