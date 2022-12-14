import React, { useContext, useEffect, useState } from 'react';
import { checkCurrentTheme, setCurrentTheme } from '../../Helpers/DarkNighttheme';
import darkIcon from '../../assets/DarkIcon.svg';
import lightIcon from '../../assets/LightIcon.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import Logo from '../../assets/logo.svg'


const Header = ({ showHideSideNav, setShowHideSideNav }) => {
    const { user, userSignout, setLoading, showAlert } = useContext(AuthContext);

    const navigate = useNavigate();
    const [theme, setTheme] = useState(false);
    const [uSettings, setUSettings] = useState(false);

    const [mobNavigation, setMobNavigation] = useState(false);
    const handleMobileNavigation = () => {
        setMobNavigation(!mobNavigation);
    }

    // toggle dark and light mode
    useEffect(() => {
        const currentTheme = checkCurrentTheme();
        if (currentTheme) {
            setTheme(currentTheme);
        } else {
            if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
                setTheme('dark');
                setCurrentTheme('dark');
            } else {
                setTheme('light');
                setCurrentTheme('light');
            }
        }

    }, []);
    // check current device status of dark / light
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme])
    // toggle dark/night
    const handleThemeSwitch = () => {
        const currentTheme = checkCurrentTheme()
        if (currentTheme == 'dark') {
            setTheme('light');
            setCurrentTheme('light');
        } else {
            setTheme('dark');
            setCurrentTheme('dark');
        }
        // console.log(currentTheme);
        //  setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    // left sidebar button
    const leftSidebar = <>
        <button className="py-4 lg:hidden" onClick={() => { setShowHideSideNav(!showHideSideNav) }}>
            {!showHideSideNav ?

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                </svg>

                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            }
        </button>
    </>
    // dark light switch button
    const swithDarkLight = <>
        <button
            onClick={handleThemeSwitch} >
            {
                theme === 'dark' ?
                    <div className='border p-1 rounded-full bg-white'>
                        <img src={darkIcon} alt="D" />
                    </div>
                    :
                    <div className='border p-1 rounded-full bg-white'>
                        <img src={lightIcon} alt="L" />
                    </div>
            }
        </button>
    </>
    // == end == toggle dark and light mode

    const handleUserSignout = () => {
        userSignout()
            .then(() => {
                setLoading(false);
                showAlert('success', 'Log out successfully')
                navigate('/login');
            })
            .catch((error) => {
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                showAlert('error', errors);
                navigate('/');
            })

    }
    const menuItems = <>
        <li className="flex group font-bold">
            <NavLink to="/" className={({ isActive }) => (isActive ?
                "dark:text-white text-purple-800 hover:text-white"
                :
                "hover:underline")} >
                Home
            </NavLink>
        </li>
        <li className="flex group font-bold">
            <NavLink to="/services" className={({ isActive }) => (isActive ?
                "dark:text-white text-purple-800 hover:text-white"
                :
                "hover:underline")} >
                Services
            </NavLink>
        </li>


        <li className="flex">
            <NavLink to="blogs" className={({ isActive }) => (isActive ?
                "dark:text-white text-purple-800 hover:text-white"
                :
                "hover:underline")} >
                Blogs
            </NavLink>
        </li>
        {user && user?.uid ? "" : ""}

        {!user?.uid &&
            <li className="flex">
                <NavLink to="/login" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Login
                </NavLink>
            </li>
        }
        {!user?.uid &&
            <li className="flex">
                <NavLink to="/registration" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Registration
                </NavLink>
            </li>
        }


        {user?.uid &&

            <li className="flex">
                <NavLink to="/dashboard/services/" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    My Services
                </NavLink>
            </li>
        }
        {user?.uid &&

            <li className="flex">
                <NavLink to="/dashboard/reviews" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    My Reviews
                </NavLink>
            </li>
        }
        {user?.uid &&

            <li className="flex bg-purple-700 px-5 py-2 rounded-md text-white hover:bg-purple-900">
                <button onClick={handleUserSignout} className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Logout
                </button>
            </li>
        }

        {user?.uid &&

            <li className="flex font-bold text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <NavLink to="dashboard" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >



                    Dashboard
                </NavLink>
            </li>
        }


    </>

    const logo = <>
        <div className="flex gap-2 items-center font-bold  text-2xl"><img src={Logo} alt="" width="32px" height="32px" /> DevsKing</div>
    </>

    const userSettings = <>
        <aside className="h-full py-3 w-80 absolute right-0 top-14 z-10" onClick={() => setUSettings(!uSettings)}>
            <div className="divide-y divide-gray-700 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 shadow-md">
                <ul className="pt-2 pb-4 space-y-2 text-sm">
                    <li className='border-b-2 dark:border-gray-700'>
                        <div className="py-4 space-y-1 flex flex-col items-center">

                            <img src={user?.photoURL ? user?.photoURL : <AiOutlineUser />} alt="" className="w-14 h-14 rounded-full dark:bg-gray-500" />

                            <h2 className="text-lg font-semibold overflow-hidden"> {user?.displayName ? user?.displayName : "Guest"} </h2>
                            <p className='text-gray-500'>{user?.email}</p>
                            <span className="flex items-center space-x-1">
                                <Link rel="noopener noreferrer" to="/" className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                            </span>

                        </div>
                    </li>

                    <li>
                        <Link to="/dashboard" className="flex items-center pl-8 py-3 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                            </svg>
                            <span>Dashboard</span>
                        </Link>
                    </li>



                    <li>
                        <Link to="/dashboard/services" className="flex items-center pl-8 py-3 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                            <span>My Services</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/services/create" className="flex items-center pl-8 py-3 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                                <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                            </svg>
                            <span>Create Service</span>
                        </Link>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" to="/dashboard/reviews" className="flex items-center pl-8 py-3 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                                <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                                <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                            </svg>
                            <span>My Reviews</span>
                        </a>
                    </li>
                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <button onClick={handleUserSignout} className="flex items-center pl-8 py-3 space-x-3  w-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
        <div className='bg-gray-900 w-full h-screen opacity-50 fixed' onClick={() => setUSettings(!uSettings)}></div>
    </>


    return (
        <>
            <div className="flex justify-between items-center content-center h-16 mx-auto w-[97%]">
                {leftSidebar}
                <Link to="/" aria-label="Back to homepage" className="py-2 align-middle lg:text-xl font-light flex items-center gap-2">
                    {logo}
                </Link>

                {/* large screen links  */}
                <ul className="hidden space-x-3 lg:flex items-center uppercase">
                    {menuItems}
                </ul>


                {/* dark light theme switch button  */}
                {swithDarkLight}


                {/* mobile navigation toggler  */}
                <button className="p-4 lg:hidden" onClick={handleMobileNavigation}>
                    {!mobNavigation ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    }
                </button>
                {/* condition: logged in & uSettings state state then render */}

                {user?.uid &&
                    <button onClick={() => setUSettings(!uSettings)}>
                        <img src={user?.photoURL ? user?.photoURL : <AiOutlineUser />} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                    </button>
                }

            </div>
            {/* Mobile Navigation  */}
            <div className={mobNavigation ? 'relative' : 'hidden'} onClick={() => setMobNavigation(!mobNavigation)}>
                <div className="fixed top-[0px] right-0 content-center p-3 space-y-2 w-full z-50  dark:bg-gray-900 dark:text-gray-100 bg-gray-200">
                    <Link to='/'>{logo}</Link>
                    {/* mobile navigation close button  */}
                    <button className='p-3 flex' onClick={handleMobileNavigation}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg> <span className='px-3 text-red-600 font-bold'>Close</span>
                    </button>
                    <div className="p-2 space-x-4">

                    </div>

                    <div className="divide-y divide-gray-700">
                        <ul className="pt-2 pb-4 space-y-2 text-sm">
                            {menuItems}
                        </ul>
                        <ul className="pt-4 pb-2 space-y-2 text-sm">
                        </ul>
                    </div>
                </div>
            </div>
            {user?.uid && uSettings && userSettings}
        </>
    );
};

export default Header;