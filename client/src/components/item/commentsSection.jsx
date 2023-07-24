import { useQuery } from "@tanstack/react-query"
import { Comment } from "./comment"
import { CommentForm } from "./commentForm"
import comments from "../../services/comments"

function CommentsSection({ itemId }) {
    const { data, isLoading, isLoadingError } = useQuery({
        queryKey: ["comments", itemId],
        queryFn: () => comments.getAll({ itemId })
    })
    if (isLoading) return <p className="p-8">Loading...</p>
    if (isLoadingError) return <p className="p-8">Failed to retrive comments</p>

    return (
        <section className="p-8">
            <h3 className="font-bold text-3xl text-center">Comments</h3>
            <div className="rounded-xl mb-6">
                {
                    data.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))
                }
            </div>
            <CommentForm itemId={itemId} />
        </section>
    )
}

export { CommentsSection }
