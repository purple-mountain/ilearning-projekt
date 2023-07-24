import { useMutation, useQueryClient } from "@tanstack/react-query"
import users from "../../services/users"

function MakeAdminBtn({ userId }) {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: users.makeAdmin,
        onSuccess: (user) => {
            queryClient.setQueryData(["users", user?.id], user)
            queryClient.invalidateQueries("users")
        }
    })
    async function handleMakeAdmin(id) {
        mutate(id)
    }
    return (
        <td className="p-4">
            <button onClick={() => handleMakeAdmin(userId)} className="font-normal text-blue-400">
                Make Admin
            </button>
        </td>
    )
}

export { MakeAdminBtn }
