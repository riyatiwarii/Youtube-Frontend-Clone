import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

const CommentSection = () => {
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    const [comments, setComments] = useState([]);
    const [pageToken, setPageToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showReply, setShowReply] = useState(false)
    useEffect (() => {
        const handleScroll = () => {
            if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
                fetchData();
                console.log("second");
           
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageToken])

    console.log(pageToken);

    useEffect(() => {
        fetchData();
        console.log("first");
    }, []);

    const fetchData = async() => {
        try {
            setIsLoading(true)
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=AIzaSyCTxTaISgkVrko3rmQiTUaYF6BHMW7Bs2U&pageToken=${pageToken}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        
        setPageToken(data.nextPageToken)
        setIsLoading(false)
        setComments((prevData) => [...prevData, ...data.items])  
        } catch (error) {
        console.log(error);
        }
    };

    console.log(comments);



    const renderComment = (comment) => {
        return (
        <p className='border border-black' key={comment.id}>
            <p>{comment.snippet?.topLevelComment?.snippet?.textOriginal || comment.snippet?.textOriginal}</p>
            {
            comment.snippet.totalReplyCount && <button className='border border-red-600' onClick={() => {
                setShowReply(!showReply)
            }}>{`${comment.replies.comments.length > 1 ? comment.replies.comments.length + ' Replies' : comment.replies.comments.length + ' Reply'} `}</button> 
            }
            {comment.replies && comment.replies.comments.map(comment => {
                console.log(comment.snippet?.textOriginal);
            return showReply && renderComment(comment);
            })}
            
        </p>
        );
    }

    return (
        <div>
        <h1>Video Page</h1>
        <p>
            {comments.map(comment => {
            return renderComment(comment);
            })}
        </p>
        {
            isLoading && <h1>Comments disabled</h1>
        }
        </div>
    );
}

export default CommentSection


