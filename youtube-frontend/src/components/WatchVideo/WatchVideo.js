import {useDispatch} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeSidebar } from "../../utils/toggleSlice"
import { useEffect } from 'react';

const WatchVideo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeSidebar())
    }, [dispatch])   
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    return (
        <section className={`dark:text-gray-100 dark:bg-black duration-100 p-5`} style={{
            transition: "0.3s"
        }}>
            <div>
                <iframe className='w-[950px] aspect-video' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video" allowFullScreen> </iframe>
            </div>  
        </section>
    )
}

export default WatchVideo