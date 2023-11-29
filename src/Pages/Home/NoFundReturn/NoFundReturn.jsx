import { Card } from "flowbite-react";


const NoFundReturn = () => {
    return (
        <div>
            <Card className="w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row items-center lg:gap-40 justify-center">
                    <div>
                        <img className="w-96 mx-auto" src="https://i.ibb.co/grwp7xX/no-return.jpg" alt="" />
                    </div>
                    <div className="space-y-8 lg:w-1/2">
                        <h5 className="text-4xl font-bold text-center text-teal-600">
                            No Fund Return
                        </h5>
                        <p className="font-normal text-gray-700">
                            After payment, without any valid reason we will never return your fund, but if you can show any valid reason from our terms and condition we will ensure your fund return.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default NoFundReturn;