import {useSelector } from 'react-redux'
import ShimmerContainer from './ShimmerContainer'
import Card from './Card'

const MainSection = () => {

    const toggleStatus = useSelector((store) => store.toggle.isSidebarOpen)
    const { data, isLoading } = useSelector((store) => store.API_DATA.items);
    
    return (        
        <section className={`dark:text-gray-100 dark:bg-black duration-100 p-5 ${toggleStatus ? "xl:ml-52 lg:ml-48 md:ml-44 ml-20" : "ml-0"}`}  style={{
            transition: "0.3s"}}>
            <div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 xl:p-7 gap-y-12'>
                {
                    !data.length ? <ShimmerContainer/> : data.map((item, index) => <Card key={index} item = {item} />)
                }
                {
                    isLoading && <ShimmerContainer/>
                }
            </div>
        </section>
    )
    
}

export default MainSection

