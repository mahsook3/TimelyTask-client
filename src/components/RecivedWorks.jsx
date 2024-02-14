import React, { useEffect, useState } from 'react';

export default () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve the user data from local storage and parse it to an object
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <>
        <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
            <div>
                <h1 className="text-gray-800 text-3xl font-semibold">
                    Explore The Jobs
                </h1>
            </div>

            <div className="mt-6">
                <h2 className="text-gray-800 text-2xl font-semibold">User Information</h2>
                {user && (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Work Category: {user.workcategory}</p>
                        <p>Work Description: {user.workdescription}</p>
                        <p>Payment Amount: {user.paymentamount}</p>
                        <p>Location: {user.location}</p>
                        <p>Latitude: {user.latitude}</p>
                        <p>Longitude: {user.longitude}</p>
                        {user.historyworksgiven.length > 0 && (
                            <div>
                                <p>History of Works Given:</p>
                                <ul>
                                    {user.historyworksgiven.map((work, index) => (
                                        <li key={index}>
                                            <p>Name: {work.name}</p>
                                            <p>Email: {work.email}</p>
                                            <p>Phone: {work.phone}</p>
                                            <p>Location: {work.location}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p>History of Works Done: {user.historyworkdone}</p>
                        <p>Date: {user.date}</p>
                    </div>
                )}
            </div>
        </section>
        <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
    <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
            Here is the list of works given by the user
        </h1>
    </div>

    {user && user.historyworksgiven.length > 0 ? (
        <ul className="mt-12 space-y-6">
            {user.historyworksgiven.map((work, idx) => (
                <li key={idx} className="p-5 bg-white rounded-md shadow-sm">
                    <div>
                        <div className="justify-between sm:flex">
                            <div className="flex-1">
                                <h3 className="text-xl font-medium text-cyan-600">
                                    {work.name}
                                </h3>
                                <p className="text-gray-500 mt-2 pr-2">
                                    {work.email}
                                </p>
                                <p className="text-gray-500 mt-2 pr-2">
                                    {work.phone}
                                </p>
                                <p className="text-gray-500 mt-2 pr-2">
                                    {work.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <p>No data</p>
    )}
</section>

        </>
    );
};
