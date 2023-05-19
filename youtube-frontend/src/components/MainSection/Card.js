import { Link } from "react-router-dom"

const Card = ({item}) => {
  
    const {id, snippet, statistics} = item

    function timeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minuteInMs = 60 * 1000;
      const hourInMs = 60 * minuteInMs;
      const dayInMs = 24 * hourInMs;
      const yearInMs = 365 * dayInMs;
      const monthInMs = 30 * dayInMs;
  
      if (diff < minuteInMs) {
        return "just now";
      } else if (diff < hourInMs) {
        const minutes = Math.floor(diff / minuteInMs);
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
      } else if (diff < dayInMs) {
        const hours = Math.floor(diff / hourInMs);
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
      } else if (diff < monthInMs) {
        const days = Math.floor(diff / dayInMs);
        return days === 1 ? "1 day ago" : `${days} days ago`;
      } else if (diff < yearInMs) {
        const months = Math.floor(diff / monthInMs);
        return months === 1 ? "1 month ago" : `${months} months ago`;
      } else {
        const years = Math.floor(diff / yearInMs);
        return years === 1 ? "1 year ago" : `${years} years ago`;
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
            <img className='xl:h-56 lg:h-40 md:h-40 h-2/3 rounded-xl'src={snippet.thumbnails.medium.url} />
            <h1 className="md:text-sm text-[10px] font-semibold">{snippet?.localized?.title || snippet?.title}</h1>
            <span className="md:text-sm text-[10px] text-stone-600 ">{snippet.channelTitle}</span>
            <div className={`flex items-center gap-x-2`}>
              {
                statistics?.viewCount ? <p className="md:text-sm text-[10px] text-stone-600">{convertViews(statistics?.viewCount)}</p> : null
              }
              <p className="md:text-sm text-[10px] text-stone-600">{timeAgo(snippet?.publishedAt)}</p>
            </div>
        </Link>
    )
}

export default Card

