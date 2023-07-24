import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import users from "../../services/users"
import { Typography } from "@material-tailwind/react"
import { MakeAdminBtn } from "./makeAdminBtn"
import { RemoveAdminBtn } from "./removeAdminBtn"

function UserTable() {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: users.getAll
    })
    const { mutate } = useMutation({
        mutationFn: users.remove,
        onSuccess: (deletedUser) => {
            queryClient.cancelQueries(["users", deletedUser.id])
            queryClient.invalidateQueries("users")
        }
    })
    function handleDeleteUser(id) {
        mutate(id)
    }


    const tableHead = ["id", "name", "username", "email", "role", "", ""]
    if (isLoading) return <p>Loading...</p>

    return (
        <div className="overflow-scroll">
            <table className="min-w-max table-auto text-left rounded-xl">
                <thead>
                    <tr>
                        {tableHead.map((head, index) => (
                            <th key={head + index} className={`border-b border-blue-gray-100 bg-blue-gray-200 p-4`}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className="bg-blue-gray-100">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {user.id}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {user.name}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {user.username}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {user.email}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {user.role}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <button onClick={() => handleDeleteUser(user.id)} className="font-normal text-red-500">
                                    Delete
                                </button>
                            </td>
                            {user.role === 'BASIC'
                                ? <MakeAdminBtn userId={user.id} />
                                : <RemoveAdminBtn userId={user.id} />
                            }
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export { UserTable }
