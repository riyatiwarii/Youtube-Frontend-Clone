import { RxHamburgerMenu } from 'react-icons/rx';
import { TfiSearch } from 'react-icons/tfi';
import { BsPersonCircle, BsFillMoonFill } from 'react-icons/bs';
import { MdOutlineWbSunny, MdMic, MdMicOff } from 'react-icons/md';
import { useDispatch, useSelector} from 'react-redux'
import { toggleSidebar } from '../../utils/toggleSlice';
import { useEffect, useState } from 'react';
import { SUGGESTIONS_URL } from '../Constants/constants';
import { cacheSearchSuggestions } from "../../utils/searchSlice"
import { Link} from 'react-router-dom';
import {API_URL_PART_1, API_DEFAULT_PART_2_URL, API_SERACH_TEXT,
    API_URL_SEARCH_PART_2, API_KEY,} from "../Constants/constants";
import useVideos from '../../hooks/useVideos';
import { setCount } from '../../utils/countSlice';
import useSpeechToText  from '../../hooks/useSpeechToText';

const NavBar = () => {

    const dispatch = useDispatch()
    function handleToggle () {
        dispatch(toggleSidebar())
    }

    const [theme, setTheme] = useState("light")

    useEffect(() => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    }, [theme]);

    const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    };

    const [apiPart2, setApiPart2] = useState(API_DEFAULT_PART_2_URL);
    const [apiPart3, setApiPart3] = useState(API_SERACH_TEXT);
    useVideos(API_URL_PART_1, apiPart2, apiPart3, API_KEY);
    const HandleSetCount = () => {
        dispatch(setCount());
      };

    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const cachedSearch = useSelector((store) => store.search)
    
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if(cachedSearch[searchQuery]){      
                setSuggestions(cachedSearch[searchQuery])
            } else {
                getSearchSuggestions()
            }
        }, 210)
        return () => {
            clearTimeout(debounceTimer)
        }
    }, [searchQuery])

    const getSearchSuggestions = async() => {
    
        const data = await fetch(SUGGESTIONS_URL + searchQuery)
        const jsonData = await data.json()
        setSuggestions(jsonData[1])
        dispatch(cacheSearchSuggestions({
            [searchQuery] : jsonData[1]
        }))
    }
    
    const [showMic, setShowMic] = useState(false);
    const [resetTranscript, listenContinuously, listenStop, transcript] = useSpeechToText();
    useEffect(() => {
        setSearchQuery(transcript);
      }, [transcript]);
    
    return (
        <nav className="dark:text-gray-100 dark:bg-black duration-100 sticky top-0 left-0 h-16 flex md:justify-around justify-center items-center xl:gap-72 lg:gap-12 md:gap-8 gap-2 z-10 bg-white">          
            <div className='flex justify-center items-center xl:gap-3 lg:gap-6 md:gap-6 gap-0'>
                <RxHamburgerMenu className= "w-8 lg:h-6 md:h-4 h-3 cursor-pointer" onClick={() => {handleToggle()}} ></RxHamburgerMenu>
                <Link to={"/"}>
                    {
                        theme === "light" ? <img className='xl:h-12 lg:h-10 md:h-9 h-8 md:w-full w-16 cursor-pointer' src='https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png'/> : <img className='xl:h-20 lg:h-16 md:h-16 h-10  cursor-pointer' src='https://i.ytimg.com/vi/smChmgocnfU/hqdefault.jpg'/>
                    }
                </Link>
            </div>
            <div className='xl:w-5/12 lg:w-8/12 md:w-8/12 flex justify-center items-center md:gap-5 gap-1'>
                <div className="relative mb-4 flex items-stretch xl:w-full lg:w-10/12 md:w-9/12 mt-3">
                        <input
                        type="search"
                        className="md:w-full w-full border border-solid rounded-l-full border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary md:h-full h-4"
                        placeholder="Search" 
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setShowSuggestions(true)
                        }} value={searchQuery}
                        onFocus={() => { searchQuery && setShowSuggestions(true) } }
                        onBlur={() => setTimeout(()=>{
                            setShowSuggestions(false)
                        }, 200)} />
                        <Link to="/"
                        className="dark:bg-stone-800 dark:border-neutral-600 rounded-r-full border-2 md:h-full h-4 md:px-6 px-2 py-2 text-xs font-medium  transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none bg-slate-50"
                        type="button" onClick={() => {
                            if(searchQuery){
                                setApiPart2(API_URL_SEARCH_PART_2);
                                setApiPart3(searchQuery);
                                HandleSetCount();
                                window.scrollTo(0, 0);
                                listenStop();
                                setShowMic(false);
                            }
                        }}>
                        <TfiSearch className='md:text-base text-xs cursor-pointer'></TfiSearch>
                        </Link>
                        {
                showSuggestions && (
                    <div className='bg-white absolute top-[2.5rem] w-10/12 py-2 px-4 font-semibold rounded-xl drop-shadow-2xl dark:text-gray-100 dark:bg-black'>
                        {suggestions.length > 0 ? (
                        <ul>
                            {suggestions.map((item, index) => {
                                return <li key={index} className='py-1 hover:bg-gray-100 cursor-pointer' onClick={() => {
                                    setSearchQuery(item)
                                }}>{item}</li>
                            })}
                        </ul>
                        ) : (
                            <p>No suggestions found</p>
                        )} 
                    </div>  
                )
            }
                </div>
                <div className="flex justify-center w-9 h-9 items-center cursor-pointer rounded-full hover:bg-neutral-300 dark:hover:bg-gray-800">
                    {
                        !showMic ? (
                            <MdMicOff className='md:text-2xl text-sm cursor-pointer' onClick={() => {
                                listenContinuously();
                                setShowMic(true);
                              }}></MdMicOff>
                        ) : (
                            <MdMic className='md:text-2xl text-sm cursor-pointer' onClick={() => {
                                listenStop();
                                setShowMic(false);
                                resetTranscript();
                              }}></MdMic>
                        )
                    }
                </div>
            </div>
            <div className='flex items-center md:gap-2 gap-1'>
                {theme === "light" ? <BsFillMoonFill className='md:text-xl text-sm mb-1 cursor-pointer' onClick={() => { handleThemeSwitch() }}></BsFillMoonFill> : <MdOutlineWbSunny className='md:text-2xl text-sm mb-1 cursor-pointer' onClick={() => { handleThemeSwitch() }}></MdOutlineWbSunny>}
                <BsPersonCircle className='md:text-3xl text-sm mb-1 cursor-pointer'></BsPersonCircle>
            </div>  
            
        </nav>       
    )
}

export default NavBar