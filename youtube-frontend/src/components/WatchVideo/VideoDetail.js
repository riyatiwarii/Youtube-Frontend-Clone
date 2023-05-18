const VideoDetail = () => {
    return (
        <div className="video-info bg-stone-100 p-2 rounded-lg">
            <div className="video-meta flex items-center font-medium">
                <p className="views mr-4">221K views</p>
                <p className="days-ago">2 days ago</p>
            </div>
            <p className="video-description text-gray-700">Detailed description goes here</p>
        </div>
    )
}

export default VideoDetail