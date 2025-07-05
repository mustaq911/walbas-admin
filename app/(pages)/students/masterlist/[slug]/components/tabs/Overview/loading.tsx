export default function OverviewLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
        </div>
    )
}