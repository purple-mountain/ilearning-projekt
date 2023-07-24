import users from "../../services/users"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function RemoveAdminBtn({ userId }) {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: users.removeAdmin,
        onSuccess: (user) => {
            queryClient.setQueryData(["users", user?.id], user)
            queryClient.invalidateQueries("users")
        }
    })
    async function handleRemoveAdmin(id) {
        mutate(id)
    }

    return (
        <td className="p-4">
            <button onClick={() => handleRemoveAdmin(userId)} className="font-normal text-blue-400">
                Remove Admin
            </button>
        </td>
    )
}

export { RemoveAdminBtn }
