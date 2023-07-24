import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import users from "../services/users";

function Nav() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
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
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-8 py-4">
                <Link to='/' className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Final Project</span>
                </Link>
                <div className="flex items-center">
                    {data?.role === 'ADMIN' && <Link to='/userdashboard' className="mr-4">User Dashboard</Link>}
                    <p className="mr-6 text-sm  text-gray-500 dark:text-white">{isLoading ? 'Loading...' : data?.name}</p>
                    {isLoading ? '' : data?.name !== 'Guest' ? <button onClick={handleLogout} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</button> : <button onClick={handleLogin} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</button>}
                </div>
            </div>
        </nav>);
}

export { Nav }
