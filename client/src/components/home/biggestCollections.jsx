import { useQuery } from "@tanstack/react-query"
import collections from "../../services/collections"
import { Link } from "react-router-dom"

function BiggestCollections() {
    const { data, isLoading, isLoadingError } = useQuery({
        queryKey: ["collections"],
        queryFn: collections.getBiggestCollections,
    })

    if (isLoading) return <p>Loading</p>
    if (isLoadingError) return <p>Error Loading Collections</p>

    return (
        <div className="p-8">
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
        </div>

    )
}

export { BiggestCollections }
