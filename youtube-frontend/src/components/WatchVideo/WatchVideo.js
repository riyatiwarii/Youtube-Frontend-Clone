import {useDispatch} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeSidebar } from "../../utils/toggleSlice"
import { useEffect } from 'react';
import { BsPersonCircle} from 'react-icons/bs';
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai';
import {TbShare3, TbDots} from 'react-icons/tb';
import {TfiDownload} from "react-icons/tfi"

const WatchVideo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeSidebar())
    }, [dispatch])   
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    return (
        <section className={`dark:text-gray-100 dark:bg-black duration-100`} style={{
            transition: "0.3s"
        }}>
            <div className='border pb-3'>
                <iframe className='w-[950px] aspect-video' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video" allowFullScreen> </iframe>
                <h1 className='font-semibold text-lg py-2'>Building a Nested Comments System with React</h1>
                <div className='flex justify-between items-center gap-9'>
                    <div className='flex justify-center gap-2 items-center'>
                        <BsPersonCircle className='md:text-4xl text-sm mb-1 cursor-pointer'></BsPersonCircle>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold'>Shadee Merhi</h2>
                            <span className='text-xs text-stone-500'>4.21K subscribers</span>
                        </div>
                        <button className='bg-black text-white px-4 py-2 rounded-3xl text-sm font-semibold ml-4'>Subscribe</button>
                    </div>
                    <div className='flex justify-center gap-2 pr-2 dark:text-black'>
                        <div className='flex justify-center items-center'>
                            <button className="bg-stone-100 font-semibold flex justify-center gap-2 items-center p-2 rounded-l-full border-r-2 border-stone-200 hover:bg-stone-200"><AiOutlineLike className='text-2xl'></AiOutlineLike> 106</button>
                            <button className="bg-stone-100 p-2 rounded-r-full hover:bg-stone-200"><AiOutlineDislike className='text-2xl'></AiOutlineDislike></button>
                        </div> 
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center px-4 py-2 rounded-full hover:bg-stone-200"><TbShare3 className='text-xl'></TbShare3> Share</button>
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center px-4 py-2 rounded-full hover:bg-stone-200"><TfiDownload></TfiDownload> Download</button>
                        <button className="bg-stone-100 px-3 py-1 rounded-full hover:bg-stone-200"><TbDots className='text-xl'></TbDots></button>
                    </div>
                </div>
            </div>  
        </section>
    )
}

export default WatchVideo