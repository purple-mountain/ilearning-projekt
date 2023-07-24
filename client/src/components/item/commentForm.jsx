import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import comments from "../../services/comments"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CommentForm({ itemId, parentId, setIsReplying = () => { } }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState, reset } = useForm({ mode: "onSubmit" });
    const { mutate } = useMutation({
        mutationFn: comments.create,
        onSuccess: (comment) => {
            queryClient.setQueryData(["comments", itemId, comment.id], comment)
            queryClient.invalidateQueries("comments")
        }
    })

    function handleCreateComment({ content }) {
        try {
            const args = parentId ? { content, itemId, parentId } : { content, itemId }
            mutate(args)
        } catch (err) {
            navigate('/login', { replace: true })
        }
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ content: "" })
            setIsReplying(false)
        }
    }, [formState, reset, setIsReplying])

    return (
        <form onSubmit={handleSubmit(handleCreateComment)} className="mb-10">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." {...register("content", { required: true })}></textarea>
            </div>
            <button disabled={!formState.isValid} type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
            </button>
        </form>
    )
}

export { CommentForm }
