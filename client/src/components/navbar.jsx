import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import users from "../services/users";
import { useState } from "react";

function Nav() {
    const navigate = useNavigate()
    const { data, isLoading, isLoadingError } = useQuery({
        queryKey: ["users"],
        queryFn: users.getCurrentUser,
    })
    async function handleLogout() {
        await users.logout()
        navigate('/login', { replace: true })
    }

    function handleLogin() {
        navigate('/login', { replace: true })
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to='/login' className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Final Project</span>
                </Link>
                <div className="flex items-center">
                    <p className="mr-6 text-sm  text-gray-500 dark:text-white">{isLoading ? 'Loading...' : data?.name}</p>
                    {isLoading ? '' : isLoadingError ? <button onClick={handleLogin} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button> : <button onClick={handleLogout} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</button>}
                </div>
            </div>
        </nav>);
}

export { Nav }
