import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import items from "../../services/items";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFields } from "../collection/customFields";
import collections from "../../services/collections";
import { useForm } from "react-hook-form";

function EditButton({ itemId, collectionId, item }) {
    const { register, handleSubmit, control, formState, setValue, reset } = useForm({ mode: "onSubmit" });
    const [isEditing, setIsEditing] = useState(false)
    const queryClient = useQueryClient()
    const { data: collection, isLoading: isCollectionLoading } = useQuery({
        queryKey: ["collection", collectionId],
        queryFn: () => collections.getCollection(collectionId)
    })
    const { mutate: updateItem } = useMutation({
        mutationFn: items.update,
        onSuccess: (updatedItem) => {
            queryClient.setQueryData(["items", collectionId, updatedItem?.id], updatedItem)
            queryClient.invalidateQueries("items")
        }
    })
    function handleEditItem(data) {
        updateItem({ ...data, itemId })
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setIsEditing(false)
        }
    }, [formState, reset])


    return (
        <>
            <button onClick={() => setIsEditing(v => !v)} className={`${isEditing && 'mb-8'} mr-4 text-blue-300 font-medium`}>
                Edit
            </button>
            {isEditing && <form onSubmit={handleSubmit(handleEditItem)} className="p-8 bg-white dark:bg-black rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item name</label>
                    <input type="text" defaultValue={item.name} name="name" id="name" {...register("name", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("name", { required: true })} />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
                    <textarea name="description" defaultValue={item.description} id="description" {...register("description", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true })} />
                </div>
                {!isCollectionLoading && <CustomFields collection={collection} register={register} control={control} setValue={setValue}></CustomFields>}
                <button type="submit" disabled={!formState.isValid} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit item</button>
            </form>}
        </>
    )
}

export { EditButton }
