import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import collections from "../services/collections"
import { ItemsTable } from "../components/itemsTable"
import { CreateItemForm } from "../components/createItemForm"

function Collection() {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ["collection", id],
        queryFn: () => collections.getCollection(id)
    })

    if (isLoading) return <p>Loading...</p>

    return (
        <main className="p-8">
            <div className="mb-8">
                <h2 className="text-4xl font-extrabold dark:text-white mb-4">{data.name}</h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
            </div>
            <ItemsTable collection={data} />
            <CreateItemForm collection={data}/>
        </main>
    )
}

export { Collection }
