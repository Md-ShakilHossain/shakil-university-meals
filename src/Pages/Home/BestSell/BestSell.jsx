import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useEffect, useState } from "react";


const BestSell = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('mostSell.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className="w-4/5 bg-orange-50 mx-auto py-10 my-20">
            <h2 className="text-4xl text-center text-teal-500 font-bold">Best Selling Product</h2>

            <section>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map((review, i) => <SwiperSlide
                            key={i}
                        >
                            <div className="flex flex-col items-center mx-24 my-16">
                                
                                <img className='h-28 md:h-60 mb-8 rounded-bl-3xl rounded-tr-3xl' src={review.image} alt="" />
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <h3 className="text-lg md:text-2xl text-[#CD9003]">{review.title}</h3>

                                <p>Category: {review.category}</p>
                                <p>Price: ${review.price}</p>
                                
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </div>
    );
};

export default BestSell;