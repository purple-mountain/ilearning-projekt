import { DatePickerField } from "./datePickerField"

function CustomFields({ collection, register, control }) {
    const getInputOptions = (key) => {
        const updatedKey = key.replace('Name', '')
        return {
            "customBoolFieldName": <input type="checkbox" {...register(`customFields.${updatedKey}`, { required: true })} />,
            "customIntFieldName": <input type="number" {...register(`customFields.${updatedKey}`, { required: true, setValueAs: v => parseInt(v) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />,
            "customDateFieldName": <DatePickerField control={control} name={`customFields.${updatedKey}`} />,
            "customStrFieldName": <input type="text" {...register(`customFields.${updatedKey}`, { required: true, setValueAs: v => v + '' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />,
        }
    }
    const getInput = (key) => {
        const optionKey = key.slice(0, -1)
        const inputOptions = getInputOptions(key)
        return inputOptions[optionKey]
    }

    return (
        <>
            {
                Object.entries(collection).map(([key, value]) => {
                    if (key.startsWith('custom') && value)
                        return (
                            <div key={key} className="mb-8">
                                <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{value}</label>
                                {getInput(key)}
                            </div>
                        )
                })
            }
        </>
    )
}

export { CustomFields }
