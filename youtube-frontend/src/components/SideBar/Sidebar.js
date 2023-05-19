import { useSelector } from 'react-redux'
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiMusicNote } from 'react-icons/hi';
import { BsNewspaper} from 'react-icons/bs';
import { RxVideo} from 'react-icons/rx';
import { useDispatch} from 'react-redux'
import { toggleSidebar } from '../../utils/toggleSlice';
import { categoryIdStatus, categoryMode } from '../../utils/categorySlice';
import {MdHomeFilled, MdSportsCricket, MdTheaterComedy, MdTravelExplore, MdMovie} from 'react-icons/md';
import { Link, useSearchParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { CATEGORY_ID_URL } from '../Constants/constants';

const Sidebar = () => {
    const toggleStatus = useSelector((store) => store.toggle.isSidebarOpen)
    const dispatch = useDispatch()
    function handleToggle () {
        dispatch(toggleSidebar())
    }
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')

    const menuItems = [
        { icon: MdHomeFilled, label: 'Home', path: '/' },
        { icon: HiMusicNote, label: 'Music', path: '/music'  },
        { icon: RxVideo, label: 'Shorts', path: '/shorts'  },
        { icon: BsNewspaper, label: 'News & Politics', path: '/news'  },
        { icon: MdSportsCricket, label: 'Sports', path: '/sports' },
        { icon: MdTheaterComedy, label: 'Comedy', path: '/comedy'  },
        { icon: MdTravelExplore, label: 'Travel & Events', path: '/travel'  },
        { icon: MdMovie, label: 'Movies', path: '/movies'  },
      ];

    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        getCategoryId()
    }, [category])

    async function getCategoryId(){
        const data = await fetch(CATEGORY_ID_URL)
        const jsonData = await data.json()
        const categoryItem = jsonData.items.find(item => item.snippet.title === category)
        if(categoryItem){
            setCategoryId(categoryItem.id)     
        }

    }

    useEffect(() => {
        dispatch(categoryIdStatus(categoryId))
    }, [categoryId])

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
            {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                 <>
                    <Link className={`flex items-center xl:gap-4 lg:gap-6 md:gap-6 gap-0 w-9/12 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-500`} key={index} to={item.path} onClick={() => {
                        if (item.label !== 'Home'){
                            setCategory(item.label)
                            dispatch(categoryMode(true))
                            dispatch(categoryIdStatus(categoryId))
                        } else {
                            dispatch(categoryMode(false))
                            dispatch(categoryIdStatus('0'))
                        }
                    }}>
                    <IconComponent className= "w-6 xl:h-10 lg:h-6 md:h-4 h-3 cursor-pointer"></IconComponent>
                    <span>{item.label}</span>
                    </Link>
                    {index === 2 && (
                    <div className="my-4 border-t-2 border-zinc-200 ..."></div>
                    )}
                 </>
                );
            })}
            </div>
        </aside>
        {
            videoId && <div className={`${toggleStatus && 'fixed top-0 lg:left-44 md:left-36 sm:left-16 left-20 w-full h-full backdrop-opacity-10 backdrop-invert bg-black/50'}`} onClick={() => {handleToggle()}} style={{
                transition: "0.5s"
            }}></div>
        }
        </>
        
    )
}

export default Sidebar
