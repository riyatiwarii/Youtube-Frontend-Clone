import WatchVideo from "../WatchVideo/WatchVideo"
import CommentSection from "../CommentSection/CommentSection"
import LiveChat from "../LiveChat/LiveChat"
import RelatedVideos from "../RelatedVideos/RelatedVideos"
import { useLayoutEffect } from "react"
import useRelatedVideos from "../../hooks/useRelatedVideos"
import { useSearchParams} from "react-router-dom"
import ErrorPage from "../ErrorPage/ErrorPage"

const WatchPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    const [,, error] = useRelatedVideos(videoId)
      
    return (
        !error ? <div className="flex lg:flex-row flex-col justify-center gap-5 xl:mx-10 xl:my-5 mx-3 my-2">
        <div className="flex lg:w-[70%] w-full flex-col">
            <WatchVideo/>
            <CommentSection/>
        </div>
        <div className="flex lg:w-[30%] w-full flex-col">
            <LiveChat/>
            <RelatedVideos/>
        </div>
    </div> : <ErrorPage/>
    )
}

export default WatchPage