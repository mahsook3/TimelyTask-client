import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
    
        try {
            const response = await axios.get('https://timelytask.onrender.com/users');
            const users = response.data;
    
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));

                // Navigate to DiscoverWorkers and pass user data as state
                navigate('/DiscoverWorkers');
            } else {
                setError('Incorrect email or password');
                toast.error('Incorrect email or password');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.');
        }
    };
    
    return (
        <main className="w-full flex">
            <ToastContainer />
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-600 lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <img src={Logo} width={150} />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-customOrange text-3xl font-bold">Welcome back to TimelyTask!</h3>
                        <p className="text-gray-300">
                            Say goodbye to the hassle of managing tasks and chasing payments.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <img src={Logo} width={150} className="lg:hidden" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign in</h3>
                            <p className="">Not have an account? <a href="javascript:void(0)"  onClick={() => navigate('/signup')} className="font-medium text-customOrange hover:text-customBlue">Create an account</a></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-customBlue hover:bg-customOrange active:bg-customOrange rounded-lg duration-150"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
