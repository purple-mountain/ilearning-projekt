import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import items from "../services/items";

function ItemsTable({ collection }) {
    const { id: collectionId } = useParams()
    const { data, isLoading, isLoadingError } = useQuery({
        queryKey: ["items", collectionId],
        queryFn: () => items.getAll({ collectionId })
    })
    if (isLoading) return <p>Loading...</p>
    if (isLoadingError) return <p>Failed to get items</p>
    const tableHead = [collection.name, ...getTableHeads(collection)]
    return (
        <div className="mb-8">
            <Card className="overflow-scroll w-full rounded-lg">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {tableHead.map((head, index) => (
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
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {row.name}
                                    </Typography>
                                </td>
                                {
                                    Object.entries(row).map(([key, value]) => {
                                        if (key.startsWith('custom') && value)
                                            return (
                                                <td key={key + value} className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {value}
                                                    </Typography>
                                                </td>
                                            )
                                    })
                                } 
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
