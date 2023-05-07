import WatchVideo from "../WatchVideo/WatchVideo"
import CommentSection from "../CommentSection/CommentSection"
import LiveChat from "../LiveChat/LiveChat"

const WatchPage = () => {
    return (
        <div className="flex flex-col">
         <div className="flex">
          <WatchVideo/>
          {/* <LiveChat/> */}
         </div>
        <CommentSection/>
        </div>
    )
}

export default WatchPage