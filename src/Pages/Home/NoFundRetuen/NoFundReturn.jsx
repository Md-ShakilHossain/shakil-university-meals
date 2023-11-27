import { Card } from "flowbite-react";


const NoFundReturn = () => {
    return (
        <div>
            <Card className="max-w-sm mx-auto" imgSrc="https://i.ibb.co/grwp7xX/no-return.jpg" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-teal-600">
                    No Fund Return
                </h5>
                <p className="font-normal text-gray-700">
                   After payment, without any valid reason we will never return your fund, but if you can show any valid reason from our terms and condition we will ensure your fund return.
                </p>
            </Card>
        </div>
    );
};

export default NoFundReturn;