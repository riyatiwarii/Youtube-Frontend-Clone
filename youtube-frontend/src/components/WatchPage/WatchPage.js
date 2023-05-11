import WatchVideo from "../WatchVideo/WatchVideo"
import CommentSection from "../CommentSection/CommentSection"
import LiveChat from "../LiveChat/LiveChat"
import RelatedVideos from "../RelatedVideos/RelatedVideos"
import { useLayoutEffect } from "react"

const WatchPage = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="flex flex-col justify-center xl:mx-10 xl:my-5 mx-3 my-2">
            <div className="flex lg:flex-row flex-col justify-between">
                <WatchVideo/>
                <LiveChat/>
            </div>
            <div className="flex lg:flex-row flex-col-reverse justify-between">
                <CommentSection/>
                <RelatedVideos/>
            </div>
        </div>
        // <div className="flex lg:flex-row flex-col justify-center gap-5 xl:mx-10 xl:my-5 mx-3 my-2">
        //     <div className="flex lg:w-[70%] w-full flex-col">
        //         <WatchVideo/>
        //         <CommentSection/>
        //     </div>
        //     <LiveChat/>
            
        // </div>
    )
}

export default WatchPage