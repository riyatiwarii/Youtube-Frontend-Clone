import { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { API_URL, SEARCH_API_URL } from '../components/Constants/constants'

const useGetVideos = () => {
    const [videos, setVideos] = useState([]);
    const [pageToken, setPageToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const cachedSearch = useSelector((store) => store.search)
    const latest = Object.keys(cachedSearch).slice(-1)[0]
    const searchCount = useSelector((store) => store.api.count)
    const [search, setSearch] = useState(searchCount)
    const[url, setUrl] = useState(API_URL)

    useEffect(() => {
        alert("hello searchcount")
        setSearch(searchCount);
        setUrl(SEARCH_API_URL + latest)
      }, [searchCount]);
    
    useEffect(() => {
    if (searchCount > 0) {
        alert("hello searchcount2")
        setVideos([])
        setUrl(SEARCH_API_URL + latest);
    } else {
        alert("hello searchcount3")
        setUrl(API_URL);
        setVideos([]);
    }
    }, [searchCount]);

    useEffect(() => {
        console.log(url);
        alert("hello searchcount4")
        getVideos(url)
    }, [search]) 

    console.log(url, search, searchCount);
    
    useEffect (() => {
        const handleScroll = () => {
            if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
                getVideos(url);
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageToken])

    async function getVideos (url) {
        setIsLoading(true)
        const data = await fetch(`${url}&pageToken=${pageToken}`)
        const jsonData = await data.json()       
        setPageToken(jsonData.nextPageToken)
        setIsLoading(false)
        setVideos((prevData) => [...prevData, ...jsonData.items])    
    }

   
    return [isLoading, videos]
}

export default useGetVideos