import { useSelector } from 'react-redux'
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsPlayBtn } from 'react-icons/bs';
import { TbClockPlay } from 'react-icons/tb';
import { VscHistory } from 'react-icons/vsc';
import { AiOutlineLike } from 'react-icons/ai';
import { useDispatch} from 'react-redux'
import { toggleSidebar } from '../../utils/toggleSlice';
import {MdHomeFilled, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater} from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom'

const Sidebar = () => {
    const toggleStatus = useSelector((store) => store.toggle.isSidebarOpen)
    const dispatch = useDispatch()
    function handleToggle () {
        dispatch(toggleSidebar())
    }
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    return (
        <>
        <aside className={`dark:text-gray-100 dark:bg-black duration-100 bg-white h-full fixed top-0 xl:mt-2 lg:mt-3 lg:-ml-3 md:mt-4 md:-ml-6 mt-4 -ml-0 ${toggleStatus ? "xl:w-48 lg:w-48 md:w-44 w-1/4 overflow-x-scroll " : "-left-full"}`} style={{
            transition: "0.3s"
        }}>
            <div className=' flex justify-center items-center xl:gap-2 lg:gap-6 md:gap-6 gap-1 w-9/12 ml-3'>
                <RxHamburgerMenu className= "w-8 lg:h-6 md:h-4 h-3 cursor-pointer" onClick={() => {handleToggle()}} ></RxHamburgerMenu>
                <div>
                    <img className='xl:h-12 lg:h-10 md:h-9 h-8 md:w-full w-20' src='https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png'/>
                </div>
            </div>
            <div className='mt-4 xl:ml-8 lg:ml-8 md:ml-8 ml-3 md:text-sm text-[6px] flex flex-col gap-2'>
                <Link className={`flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer hover:bg-stone-100`} to ="/">
                    <MdHomeFilled className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3 cursor-pointer"></MdHomeFilled>
                    <span>Home</span>
                </Link>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <TbClockPlay className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3 cursor-pointer"></TbClockPlay>
                    <span>Shorts</span>
                </div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-1 gap-0 w-9/12 cursor-pointer'>
                    <MdOutlineSubscriptions className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></MdOutlineSubscriptions>
                    <span>Subscriptions</span>
                </div>
                <div className="my-4 border-t-2 border-zinc-200 ..."></div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <MdOutlineVideoLibrary className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></MdOutlineVideoLibrary>
                    <span>Library</span>
                </div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <VscHistory className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></VscHistory>
                    <span>History</span>
                </div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <BsPlayBtn className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></BsPlayBtn>
                    <span>Your videos</span>
                </div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <MdOutlineWatchLater className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></MdOutlineWatchLater>
                    <span>Watch later</span>
                </div>
                <div className='flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer'>
                    <AiOutlineLike className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3"></AiOutlineLike>
                    <span>Liked videos</span>
                </div>
            </div>
        </aside>
        {
            videoId && <div className={`${toggleStatus && 'fixed top-0 left-44 w-full h-full backdrop-opacity-10 backdrop-invert bg-black/50'}`} onClick={() => {handleToggle()}} style={{
                transition: "0.5s"
            }}></div>
        }
        </>
        
    )
}

export default Sidebar

// MdHomeFilled
// MdOutlineSubscriptions
// MdOutlineVideoLibrary/BsCollectionPlay
// VscHistory
// BsPlayBtn
// MdOutlineWatchLater
// AiOutlineLike
// HiChevronDown