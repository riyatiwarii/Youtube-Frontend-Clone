import {useDispatch} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeSidebar } from "../../utils/toggleSlice"
import { useState, useEffect } from 'react';
import { BsPersonCircle} from 'react-icons/bs';
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai';
import {TbShare3, TbDots} from 'react-icons/tb';
import {TfiDownload} from "react-icons/tfi"
import ReactPlayer from 'react-player';

const WatchVideo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeSidebar())
    }, [dispatch])   
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    const [isLoading, setIsLoading] = useState(true);

    const handleOnLoad = () => {
      setIsLoading(false);
    };
    return (
        <section className="lg:w-[70%] w-full dark:text-gray-100 dark:bg-black duration-100 " style={{
            transition: "0.3s"
        }}>
            <div className='pb-3'>
                <iframe className='w-full aspect-video' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video" allowFullScreen> </iframe>
                {/* <ReactPlayer
                className={`w-full aspect-video  my-2 ${isLoading ? "bg-gray-200 dark:bg-gray-800" : "bg-none"}`}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={true}
                onLoad={handleOnLoad}/> */}
                <h1 className='font-semibold md:text-lg py-2'>Building a Nested Comments System with React</h1>
                <div className='flex justify-between flex-wrap md:flex-nowrap items-center md:gap-9 gap-3'>
                    <div className='flex justify-center gap-2 items-center'>
                        <BsPersonCircle className='md:text-4xl text-lg mb-1 cursor-pointer'></BsPersonCircle>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold md:text-base text-sm'>Shadee Merhi</h2>
                            <span className='text-xs text-stone-500'>4.21K subscribers</span>
                        </div>
                        <button className='bg-black text-white md:px-4 md:py-2 px-2 py-1 rounded-3xl md:text-sm text-[0.8rem] font-semibold md:ml-4'>Subscribe</button>
                    </div>
                    <div className='flex justify-center gap-2 pr-2 dark:text-black'>
                        <div className='flex justify-center items-center'>
                            <button className="bg-stone-100 font-semibold flex justify-center gap-2 items-center md:p-2 p-1 rounded-l-full border-r-2 border-stone-200 md:text-base text-xs hover:bg-stone-200"><AiOutlineLike className='md:text-2xl'></AiOutlineLike> 106</button>
                            <button className="bg-stone-100 md:p-2 p-1 rounded-r-full hover:bg-stone-200"><AiOutlineDislike className='md:text-2xl'></AiOutlineDislike></button>
                        </div> 
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center md:px-4 md:py-2 px-2 py-1 rounded-full md:text-base text-xs hover:bg-stone-200"><TbShare3 className='md:text-xl'></TbShare3> Share</button>
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center md:px-4 md:py-2 px-2 py-1 rounded-full hover:bg-stone-200 md:text-base text-xs"><TfiDownload></TfiDownload> Download</button>
                        <button className="bg-stone-100 md:px-3 px-2 py-1 rounded-full hover:bg-stone-200"><TbDots className='md:text-xl'></TbDots></button>
                    </div>
                </div>
            </div>  
        </section>
    )
}

export default WatchVideo