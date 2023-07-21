import { useFieldArray, useForm } from "react-hook-form";
import collections from '../services/collections';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function CreateCollectionForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState, control } = useForm({ mode: "onSubmit" });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "inputs"
    })
    const queryClient = useQueryClient()
    const { status, error, mutate } = useMutation({
        mutationFn: collections.create,
        onSuccess: collection => {
            queryClient.setQueryData(["collections", collection.id], collection)
            queryClient.invalidateQueries('collections')
        }
    })

    const handleAddInput = () => {
        append({})
    }

    function handleCreateCollection({ name, description, topicName, inputs }) {
        try {
            const customFieldsName = transformIntoObject(inputs)
            mutate({ name, description, topicName, customFieldsName })
        } catch (err) {
            navigate('/login', { replace: true })
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateCollection)} className="p-8 bg-white dark:bg-black">
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("name", { required: true })} />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Description</label>
                <textarea name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true })} />
            </div>
            <div className="mb-4">
                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your topic</label>
                <select id="topic" {...register("topicName")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Keyboards">Keyboards</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Artwork">Artwork</option>
                </select>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="customFields" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your custom field type</label>
                        <select id="customFields" {...register(`inputs.${index}.type`)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={`customField${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Field Name</label>
                        <input id={`customField${index}`} {...register(`inputs.${index}.name`)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button type="button" onClick={() => remove(index)} className="mt-4 text-white bg-red-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Remove field
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddInput} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add New Field</button>
            <button type="submit" disabled={!formState.isValid} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create collection</button>
        </form>
    )
}

function transformIntoObject(inputs) {
    const customFieldsName = {}
    const options = {
        "boolean": "Bool",
        "string": "Str",
        "number": "Int",
        "date": "Date"
    }
    const typeCounter = {}
    inputs.forEach((input) => {
        const prefix = options[input.type]
        const counter = typeCounter[input.type] || 1;
        if (counter > 3)
            return
        const fieldName = `custom${prefix}FieldName${counter}`
        customFieldsName[fieldName] = input.name
        typeCounter[input.type] = counter + 1;
    })
    return customFieldsName
}

export { CreateCollectionForm }
