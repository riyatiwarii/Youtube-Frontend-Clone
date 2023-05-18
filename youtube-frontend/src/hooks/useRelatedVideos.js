import { useState, useEffect } from "react";

const useRelatedVideos = (videoId) => {

    const [relatedVideos, setRelatedVideos] = useState([]) 
    const [pageToken, setPageToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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

      console.log(relatedVideos);

    async function getRelatedVideos() {
        setIsLoading(true);
        const data = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDb8whlcnVXgcaL8rP21kQk8yjhiEKfvDo&part=snippet&type=video&maxResults=6&relatedToVideoId=${videoId}&pageToken=${pageToken}`);
        console.log(data);
        const dataJson = await data.json();
        
        setIsLoading(false);
        setRelatedVideos((prevItems) => [...prevItems, ...dataJson?.items]);
        setPageToken(dataJson.nextPageToken);
    
      }

      console.log(pageToken);

    return [relatedVideos, isLoading]
}

export default useRelatedVideos