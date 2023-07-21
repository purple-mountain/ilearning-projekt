import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import userService from "../services/users"
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Login() {
    const { register, handleSubmit, formState } = useForm({ mode: "onSubmit" });
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: userService.authenticate,
        onSuccess: user => {
            queryClient.setQueryData(["users", user.username], user)
            navigate('/', { replace: true })
        }
    })

    async function handleLogin(user) {
        try {
            mutate({
                user,
                action: 'login'
            })
        } catch (err) {
            setErrorMsg('Invalid username or password')
        }
    }


    return (
        <main className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="username" name="username" id="username" {...register("username", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" {...register("password", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errorMsg ? <p className="text-amber-900">{errorMsg}</p> : ''}
                            <button type="submit" disabled={!formState.isValid} className="disabled:opacity-50 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    )
}

export { Login }
