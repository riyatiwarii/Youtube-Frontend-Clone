import WatchVideo from "../WatchVideo/WatchVideo"
import CommentSection from "../CommentSection/CommentSection"
import LiveChat from "../LiveChat/LiveChat"

const WatchPage = () => {
    return (
        <div className="flex flex-col justify-center xl:mx-10 xl:my-5  mx-3 my-2">
         <div className="flex lg:flex-row flex-col justify-between">
          <WatchVideo/>
          <LiveChat/>
         </div>
        <CommentSection/>
        </div>
    )
}

export default WatchPage