import { useForm } from "react-hook-form"
import items from "../../services/items";
import { CustomFields } from "./customFields";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function CreateItemForm({ collection }) {
    const queryClient = useQueryClient()
    const { register, handleSubmit, control, formState, setValue, reset } = useForm({ mode: "onSubmit" });
    const { mutate } = useMutation({
        mutationFn: items.create,
        onSuccess: item => {
            queryClient.setQueryData(["items", collection.id, item.id], item)
            queryClient.invalidateQueries('items')
        }
    })

    function handleCreateItem(data) {
        mutate({ ...data, id: collection.id })
        reset()
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({})
        }
    }, [formState, reset])

    return (
        <form onSubmit={handleSubmit(handleCreateItem)} className="p-8 bg-white dark:bg-black rounded-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item name</label>
                <input type="text" name="name" id="name" {...register("name", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("name", { required: true })} />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
                <textarea name="description" id="description" {...register("description", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true })} />
            </div>
            <CustomFields collection={collection} register={register} control={control} setValue={setValue}></CustomFields>
            <button type="submit" disabled={!formState.isValid} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add item</button>
        </form>
    )
}

export { CreateItemForm }
