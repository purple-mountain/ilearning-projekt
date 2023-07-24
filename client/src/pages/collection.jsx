import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import collections from "../services/collections"
import { ItemsTable } from "../components/collection/itemsTable"
import { CreateItemForm } from "../components/collection/createItemForm"
import { Nav } from "../components/navbar"
import users from "../services/users"
import { DataDetails } from "../components/dataDetails"

function Collection() {
    const { id } = useParams()
    const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: users.getCurrentUser
    })
    const { data: collection, isLoading: isCollectionLoading, isLoadingError } = useQuery({
        queryKey: ["collection", id],
        queryFn: () => collections.getCollection(id)
    })
    if (isCollectionLoading) return <p>Loading...</p>
    if (isLoadingError) return <p>Failed to get the collection</p>

    return (
        <>
            <Nav />
            <main className="p-8">
                <DataDetails data={collection} />
                <ItemsTable collection={collection} />
                {isCurrentUserLoading || isCollectionLoading ? '' : currentUser?.id === collection?.authorId || currentUser.role === 'ADMIN' ? <CreateItemForm collection={collection} /> : ''}
            </main>
        </>
    )
}

export { Collection }
