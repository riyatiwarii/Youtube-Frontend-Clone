import { useState, useEffect } from "react";
import { API_KEY } from "../components/Constants/constants";

const useRelatedVideos = (videoId) => {

    const [relatedVideos, setRelatedVideos] = useState([]) 
    const [pageToken, setPageToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setRelatedVideos([])
        getRelatedVideos()
        window.scrollTo(0, 0)
    }, [videoId])

    useEffect(() => {
        const handleScroll = () => {
          if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
          ) {
            getRelatedVideos();
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [pageToken]);

    async function getRelatedVideos() {

      try {
        setIsLoading(true);
        const data = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=6&relatedToVideoId=${videoId}&pageToken=${pageToken}`);
        if (!data.ok) {
          throw new Error(`Failed to fetch related videos: ${data.status} ${data.statusText}`);
        } 
        const dataJson = await data.json();
        setIsLoading(false);
        setRelatedVideos((prevItems) => [...prevItems, ...dataJson?.items]);
        setPageToken(dataJson.nextPageToken);
      } catch (error) {
        console.error('Error while fetching related videos:', error);
        setError(error)
      }
   
    }

    return [relatedVideos, isLoading, error]
}

export default useRelatedVideos