import { useQuery } from "@tanstack/react-query"
import collections from "../services/collections"
import { Link, useNavigate } from "react-router-dom"

function BiggestCollections() {
    const navigate = useNavigate()
    const { data, isLoading, isLoadingError } = useQuery({
        queryKey: ["collections"],
        queryFn: collections.getAllCollections,
    })

    if (isLoading) return <p>Loading</p>
    if (isLoadingError) return <p>Error Loading Collections</p>

    return (
        <>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Biggest Collections:</h2>
            <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                {
                    data.map(collection => (
                        <li key={collection.id}>
                            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
                        </li>
                    ))
                }
            </ol>
        </>

    )
}

export { BiggestCollections }
