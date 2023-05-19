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
    const [channelDetails, setChannelDetails] = useState(null)
    const [videoStats, setVideoStats] = useState(null)
    const [readMore, setReadMore] = useState(false);
    const [showDescription, setShowDescription] = useState(500);

    const handleOnLoad = () => {
      setIsLoading(false);
    };

    useEffect(() => {
        getVideoIdDetails()
    }, [videoId])

    async function getVideoIdDetails(){
        const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=AIzaSyAurpw11Txt3gTkNVXvPh3xVia7nzsHqSY`)
        const jsonData = await data.json()
        setChannelDetails(jsonData.items[0].snippet)
        setVideoStats(jsonData.items[0].statistics)
    }

    function formatCount(count) {
        if (!count) {
          return;
        }
        if (count < 1000) {
          return count.toString();
        } else if (count >= 1000 && count < 1000000) {
          return (count / 1000).toFixed(1) + "K ";
        } else {
          return (count / 1000000).toFixed(1) + "M ";
        }
      }

    return (
        <section className=" w-full dark:text-gray-100 dark:bg-black duration-100 " style={{
            transition: "0.3s"
        }}>
            <div className='pb-3'>
                <ReactPlayer
                className={`w-full aspect-video  my-2 ${isLoading ? "bg-gray-200 dark:bg-gray-800" : "bg-none"}`}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                playing={true}
                onLoad={handleOnLoad}/>
                <h1 className='font-semibold md:text-lg py-2'>{channelDetails?.title}</h1>
                <div className='flex justify-between flex-wrap md:flex-nowrap items-center md:gap-9 gap-3'>
                    <div className='flex justify-center gap-2 items-center'>
                        <BsPersonCircle className='md:text-4xl text-lg mb-1 cursor-pointer'></BsPersonCircle>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold md:text-base text-sm'>{channelDetails?.channelTitle}</h2>
                            <span className='text-xs text-stone-500'>4.21K subscribers</span>
                        </div>
                        <button className='bg-black text-white md:px-4 md:py-2 px-2 py-1 rounded-3xl md:text-sm text-[0.8rem] font-semibold md:ml-4'>Subscribe</button>
                    </div>
                    <div className='flex justify-center gap-2 pr-2 dark:text-black'>
                        <div className='flex justify-center items-center'>
                            <button className="bg-stone-100 font-semibold flex justify-center gap-2 items-center md:p-2 p-1 rounded-l-full border-r-2 border-stone-200 md:text-base text-xs hover:bg-stone-200"><AiOutlineLike className='md:text-2xl'></AiOutlineLike>{formatCount(videoStats?.likeCount)}</button>
                            <button className="bg-stone-100 md:p-2 p-1 rounded-r-full hover:bg-stone-200"><AiOutlineDislike className='md:text-2xl'></AiOutlineDislike></button>
                        </div> 
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center md:px-4 md:py-2 px-2 py-1 rounded-full md:text-base text-xs hover:bg-stone-200"><TbShare3 className='md:text-xl'></TbShare3> Share</button>
                        <button className="bg-stone-100 font-semibold flex gap-1 items-center md:px-4 md:py-2 px-2 py-1 rounded-full hover:bg-stone-200 md:text-base text-xs"><TfiDownload></TfiDownload> Download</button>
                        <button className="bg-stone-100 md:px-3 px-2 py-1 rounded-full hover:bg-stone-200"><TbDots className='md:text-xl'></TbDots></button>
                    </div>
                </div>
                <div className="video-info mt-4 bg-stone-100 p-2 rounded-lg">
                    <div className="video-meta flex items-center font-medium">
                        <p className="views mr-4">221K views</p>
                        <p className="days-ago">2 days ago</p>
                    </div>
                    <p className="video-description text-gray-700">{channelDetails?.description.length > 500
                ? channelDetails?.description.slice(0, showDescription) +"... "
                : channelDetails?.description}</p>
                    {channelDetails?.description.length > 500 ? (
                <button className=" text-md font-bold text-stone-500"
                  onClick={() => {
                    setReadMore(!readMore);
                    if (readMore) {
                      setShowDescription(500);
                    } else {
                      setShowDescription(channelDetails?.description.length);
                    }
                  }}
                >
                  {!readMore ? "Read More" : "Read Less"}
                </button>
              ) : null}
                </div>
            </div> 
            
        </section>
    )
}

export default WatchVideo