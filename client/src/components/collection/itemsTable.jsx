import { Card, Typography } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import items from "../../services/items";

function ItemsTable({ collection }) {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ["items", collection.id],
        queryFn: () => items.getAll({ collectionId: collection.id })
    })
    const { mutate } = useMutation({
        mutationFn: items.remove,
        onSuccess: () => {
            queryClient.invalidateQueries('items')
        }
    })
    function handleDeleteItem(itemId) {
        mutate({ itemId })
    }
    if (isLoading) return <p className="mb-8">Loading...</p>
    if (!data) return <p className="mb-8">Failed to get items</p>
    if (data.length === 0) return <p className="mb-8">This collection does not have items</p>
    const tableHead = [collection.name, ...getTableHeads(collection), '']
    return (
        <div className="mb-8">
            <Card className="overflow-scroll w-full rounded-lg">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {tableHead.map((head) => (
                                <th key={head} className={`border-b border-blue-gray-100 bg-blue-gray-200 p-4`}>
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
                        {data.map((row) => (
                            <tr key={row.id} className="bg-blue-gray-100">
                                <td className="p-4">
                                    <Link to={`/items/${collection.id}/${row.id}`} className="text-blue-400 font-normal">
                                        {row.name}
                                    </Link>
                                </td>
                                {
                                    Object.entries(row).map(([key, value]) => {
                                        if (key.startsWith('custom') && value)
                                            return (
                                                <td key={key + value} className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {Date.parse(value) ? new Date(value).toLocaleDateString() : value.toString()}
                                                    </Typography>
                                                </td>
                                            )
                                    })
                                }
                                <td className="p-4">
                                    <button onClick={() => handleDeleteItem(row.id)} className="font-normal text-red-500">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card >
        </div>
    );
}

function getTableHeads(collection) {
    const customField = Object.entries(collection)
        .filter(([key, value]) => key.startsWith('custom') && value)
        .map(([, value]) => value)
    return customField
}

export { ItemsTable };
