import { Accordion, Card } from "flowbite-react";
import questionImg from "../../../assets/question.png"

const Faq = () => {
    return (
        <div className="w-4/5 mx-auto mt-12">
            <Card>
                <h5 className="text-4xl font-bold text-center text-teal-600">
                    F.A.Q
                </h5>
                <div className="flex items-center justify-between">
                    <div>
                        <img src={questionImg} className="w-96" alt="" />
                    </div>
                    <div className="w-3/5">
                        <Accordion>
                            <Accordion.Panel>
                                <Accordion.Title>Why we best?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500">
                                        We offer you fresh food with cheaper rate than any other platform and we are ver strict with on time delivery.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Can I get return my fund?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        With out our product issue you will not get your fund return.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Service time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        We will serve you 24/7 and you will get your food on time.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Faq;