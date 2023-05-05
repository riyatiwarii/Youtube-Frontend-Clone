const Shimmer = () => {
    return (
        <div className="flex flex-col gap-1">
            <div className='xl:h-52 lg:h-40 md:h-40 h-28 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl'></div>
            <span className="h-8 bg-gray-200 dark:bg-gray-800 animate-pulse"></span>
            <span className="h-[15px] w-1/3 bg-gray-200 dark:bg-gray-800 animate-pulse"></span>
            <span className="h-[15px] w-1/2 bg-gray-200 dark:bg-gray-800 animate-pulse"></span>
        </div>
    )
}

const ShimmerContainer = () => {
    return (
        Array(6).fill("").map((item, index) => {
            return <Shimmer key={index}/>
        })
    )
}

export default ShimmerContainer