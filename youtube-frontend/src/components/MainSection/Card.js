import { Link } from "react-router-dom"

const Card = ({item}) => {
  
    const {id, snippet, statistics} = item

  
    function timeAgo(publishedAt) {
        const now = new Date();
        const date = new Date(publishedAt);
        const diff = now - date;
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
      
        if (diff < minute) {
          return "just now";
        } else if (diff < hour) {
          const minutesAgo = Math.floor(diff / minute);
          return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
        } else if (diff < day) {
          const hoursAgo = Math.floor(diff / hour);
          return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
        } else {
          const daysAgo = Math.floor(diff / day);
          return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
        }
      }

    function convertViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M views';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K views';
    } else {
        return views + ' views';
    }
    }

    return (
        <Link className="flex flex-col" to={`/watch?v=${id?.videoId || id}`}>
            <img className='xl:h-52 lg:h-40 md:h-40 h-2/3 rounded-xl'src={snippet.thumbnails.medium.url} />
            <h1 className="md:text-sm text-[10px] font-semibold">{snippet?.localized?.title || snippet?.title}</h1>
            <span className="md:text-sm text-[10px] text-stone-600 ">{snippet.channelTitle}</span>
            <div className="flex items-center gap-x-2">
                <p className="md:text-sm text-[10px] text-stone-600">{convertViews(statistics?.viewCount)}</p>
                <p className="md:text-sm text-[10px] text-stone-600">{timeAgo(snippet?.publishedAt)}</p>
            </div>
        </Link>
    )
}

export default Card

