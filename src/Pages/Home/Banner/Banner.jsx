import { Carousel } from "flowbite-react";

const Banner = () => {
    return (
        <div className="w-4/5 mx-auto mt-10 relative">
        <div className="h-64 md:h-80 rounded-lg lg:h-[500px]">
            <Carousel>
                <div className="flex h-full items-center
                 justify-center">
                    <img src="https://i.ibb.co/X78Tgq8/top-view-delicious-breakfast.jpg" className="h-64 md:h-80 w-full rounded-lg lg:h-[500px]" alt="" />

                </div>
                <div className="flex h-full items-center justify-center">
                    <img src="https://i.ibb.co/djXwrKM/gourmet-grilled-meat-vegetables.jpg" className="h-64 md:h-80 w-full rounded-lg lg:h-[500px]" alt="" />
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700">
                    <img src="https://i.ibb.co/DKxLG9c/dinner1.jpg" className="h-64 md:h-80 w-full rounded-lg lg:h-[500px]" alt="" />
                </div>
            </Carousel>
            <div className="bg-gradient-to-r from-black to-[#80000000] absolute top-0 w-4/5 h-64 md:h-80 lg:h-[500px] rounded-lg p-2 md:p-10 lg:p-40">
                <div className="w-64 md:w-4/5">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Await Delicious Discoveries</h3>
                    <p className="text-gray-300 mt-2 md:mt-4">Explore a world of flavors with our curated collection of mouthwatering recipes</p>
                    <form>
                        <input type="text" className="w-full rounded-2xl mt-4 md:mt-8 text-center" />
                        <div className="w-1/2 mt-2 mx-auto">
                            <input className="bg-slate-300 md:py-1 rounded-2xl text-xl font-bold hover:bg-slate-400 w-full" type="submit" value="Search" />
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
};

export default Banner;