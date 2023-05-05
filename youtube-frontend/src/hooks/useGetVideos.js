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
        setSearch(searchCount);
        setUrl(SEARCH_API_URL + latest)
      }, [searchCount]);

    useEffect(() => {
        setVideos([])
        setUrl(SEARCH_API_URL + latest);
      }, [search]);
    
    useEffect(() => { 
        setUrl(API_URL)
    }, [])

    useEffect(() => {
        console.log(url);
        getVideos(url)
    }, [search]) 
    
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
        console.log(jsonData);
        console.log(jsonData.items);        
        setPageToken(jsonData.nextPageToken)
        setIsLoading(false)
        setVideos((prevData) => [...prevData, ...jsonData.items])    
    }

   
    return [isLoading, videos]
}

export default useGetVideos