function DataDetails({ data }) {
    return (
        <div className="mb-8" >
            <h2 className="text-4xl font-extrabold dark:text-white mb-4">{data.name}</h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
        </div>
    )
}

export { DataDetails }
