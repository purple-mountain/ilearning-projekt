import { useParams } from "react-router-dom"
import { Nav } from "../components/navbar"
import { useQuery } from "@tanstack/react-query"
import { DataDetails } from "../components/dataDetails"
import items from "../services/items"
import { CommentsSection } from "../components/item/commentsSection"
import users from "../services/users"
import { EditButton } from "../components/item/editButton"

function Item() {
    const { itemId, collectionId } = useParams()
    const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: users.getCurrentUser
    })
    const { data, isLoading } = useQuery({
        queryKey: ["items", collectionId, itemId],
        queryFn: () => items.getOne({ itemId, collectionId })
    })

    return (
        <>
            <Nav />
            <main role="main" className="p-8">
                {isLoading || isCurrentUserLoading ? <p>Loading...</p>
                    : <>
                        <DataDetails data={data} />
                        {data?.collection?.authorId === currentUser.id || currentUser.role === 'ADMIN' ? <EditButton item={data} itemId={itemId} collectionId={collectionId} /> : ''}
                    </>}
            </main>
            <CommentsSection itemId={itemId} />
        </>
    )
}

export { Item }
