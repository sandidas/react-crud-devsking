import React from 'react';
import { Link } from 'react-router-dom';

const HomeServiceCard = ({ service }) => {



    const textSliceShowLimited = () => {
        const text = service?.description
        // return text.split(" ").splice(0, 50).join(" ");
        return text.substring(0, 100) + '...';
    };

    return (

        <div className="pt-5 rounded-md pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100">
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center">
                    <div rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-100">{service?.service_categories}</div>
                </div>
            </div>
            <div className="space-y-6 flex flex-col">
                <div className="space-y-">
                    <img src={service?.thumbnail} alt="" className="block object-cover object-center w-full   rounded-md h-72 dark:bg-gray-500" />
                    <div className="flex pt-4 items-center text-xs justify-between">
                        <span>Total Reviews: {service?.reviewsCount}</span>
                        <span>Average Reviews: {service?.ratingsAverage}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="block">
                        <h3 className="text-xl font-semibold dark:text-purple-400">

                            {service?.title}

                        </h3>
                    </div>
                    <div className="leading-snug dark:text-gray-400">
                        {
                            textSliceShowLimited()

                        }


                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-xl'>
                        ${service?.price}
                    </div>
                    <Link to={`/services/single/${service?._id}`} className="px-8 py-3 font-semibold rounded-md dark:bg-purple-700  bg-gray-400 text-white hover:bg-purple-800 dark:hover:bg-purple-900 dark:text-white "> Read More</Link>
                </div>
            </div>
        </div>

    );
};

export default HomeServiceCard;