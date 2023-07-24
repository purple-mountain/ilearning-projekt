import { useState } from "react"
import { CommentForm } from "./commentForm"
import { useParams } from "react-router-dom"

function Comment({ comment, isOneLevelDeep = false }) {
    const { itemId } = useParams()
    const [isReplying, setIsReplying] = useState(false)

    return (
        <div className="flex-col mt-4 mb-8 rounded-xl">
            <div className="flex items-center flex-1 font-bold leading-tight">{comment?.author.name}
                <span className="ml-3 text-xs font-normal text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex-1 pr-4 text-sm font-medium leading-loose text-gray-600">
                {comment.content}
            </div>
            {!isOneLevelDeep && <button onClick={() => setIsReplying(prev => !prev)} className={`${isReplying && 'mb-6'} inline-flex items-center mt-2 flex-column`}>
                <p className="w-5 h-5 text-gray-600 cursor-pointer fill-current hover:text-gray-900">
                    Reply
                </p>
            </button>}
            <div className="pl-6">
                {comment?.children?.map(comnt => (
                    <Comment key={comnt.id} comment={comnt} isOneLevelDeep={true} />
                ))}
            </div>
            {isReplying && <CommentForm setIsReplying={setIsReplying} itemId={itemId} parentId={comment.id} />}
        </div>
    )
}

export { Comment }
