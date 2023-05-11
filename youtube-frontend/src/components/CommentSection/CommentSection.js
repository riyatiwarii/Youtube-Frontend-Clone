import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addReply, deleteReply, editReply } from "../../utils/commentsSlice";

const CommentSection = () => {

    const [commentInput, setCommentInput] = useState("")
    const dispatch = useDispatch()
    const commentsData = useSelector((store) => store.comments.commentitems)

    const Reply = ({data, editMode, editInput, setEditInput, handleReplyMode}) => {

        const [replyInput, setReplyInput] = useState("")
        const generateUniqueId = () => {
            return Math.random().toString(36).slice(2, 9);
          };

        function handleReply(){
            if (editMode) {
                console.log("edit");
                console.log(editInput);
                dispatch(editReply({
                    id: data.id,
                    body: editInput
                }))
            } else {
                console.log("reply");
                dispatch(addReply({
                    parentId: data.id,
                    reply: {
                        id: generateUniqueId(),
                        body: replyInput,
                        author: "Riya Tiwari",
                        replies: [],
                        control: true
                    }
                }))
            }
        }

        function handleCancel(){
            if(!editMode){
                handleReplyMode(false)
            } else {
                handleReplyMode(false)
            }
        }

        return (
           <div className="flex-col">
            <div className="flex gap-2 m-3">
                <span className="flex md:text-xl text-xs text-white justify-center items-center md:w-10 md:h-10 w-6 h-6 rounded-full bg-stone-700">R</span>
                <input className="border-b border-gray-200 dark:text-black md:p-2 focus:border-black focus:outline-none placeholder-stone-500 w-full md:text-base text-xs" placeholder={!editMode ? "Add a reply..." : "Edit a reply..."} value={!editMode ? replyInput : editInput} onChange={(e) => { 
                    !editMode ? setReplyInput(e.target.value) : setEditInput(e.target.value)}}/>
            </div>
            <div className="flex ml-[4%] gap-2">
                <button className="md:text-sm md:px-4 md:py-2 px-2 py-1 text-[0.7rem] hover:bg-stone-200 font-semibold rounded-full" onClick={handleCancel}>Cancel</button>
                <button className={`md:text-sm md:px-4 md:py-2 px-2 py-1 text-[0.7rem] font-semibold rounded-full ${replyInput || editInput ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" :"bg-stone-100 text-stone-500 dark:text-stone-500"} cursor-not-allowed`} disabled={!replyInput && !editMode} onClick={handleReply}>{!editMode ? "Reply" : "Edit"}</button>
            </div> 
           </div>
        )
    }

    const Comment = ({data}) => {
        const { id, author, body } = data;
        const [replyMode, setReplyMode] = useState(false)
        const [editMode, setEditMode] = useState(false)
        const [editInput, setEditInput] = useState("")
        function handleReplyMode (value) {
            setReplyMode(value)
            setEditMode(value)
        }
        function handleDelete(){
            dispatch(deleteReply(data.id))
        }
        function handleEdit(){
            setReplyMode(!replyMode)
            setEditMode(!editMode)
            setEditInput(data.body) 
        }

        return (
            <div>
                {
                !editMode ? (<div className={`flex md:gap-3 gap-1`}>
                    <span className="flex md:text-xl text-xs text-white justify-center items-center md:w-10 md:h-10 w-6 h-6 rounded-full bg-stone-700">{author.slice(0, 1).toUpperCase()}</span>
                    <div className={`flex-col w-full`}>
                        <span className="font-medium md:text-base text-sm">{author}</span>
                        <p className="dark:text-white text-gray-800 md:mt-1 md:text-base text-sm">{body}</p>
                        {
                            !replyMode ? <button className="mb-2 mt-1 md:text-base text-sm" onClick={() => {
                                setReplyMode(!replyMode)
                            }}>Reply</button>  : <Reply data = {data} editMode={editMode} handleReplyMode = {handleReplyMode}/>
                        }
                        {
                            !replyMode && data.control && (
                                <>
                                <button className="mb-2 ml-2 mt-1 md:text-base text-sm" onClick={handleEdit}>Edit</button> 
                                <button className="mb-2 ml-2 mt-1 md:text-base text-sm" onClick={handleDelete}>Delete</button>
                                </> 
                            )
                        }
                    </div>
                </div>) : (<div className={`flex-col w-full`}>
                    {
                        replyMode && <Reply data = {data} editMode={editMode} editInput = {editInput} setEditInput = {setEditInput} handleReplyMode = {handleReplyMode}/>
                    }
                </div>)
                }
            </div>
        )
    }

    const CommentList = ({ data }) => {
        return data?.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment data={comment} />
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-5 mt-1 flex flex-col gap-2 md:ml-5 border-l-2 border-black">
                  <CommentList data={comment.replies} />
                </div>
              )}
            </div>
          );
        });
    };      

    return (
        <div className="lg:w-[70%] w-full dark:text-gray-100 dark:bg-black duration-100">
            <div className="flex flex-col justify-center gap-2 py-4">
                <div className="flex-col">
                    <div className="flex gap-2">
                        <span className="flex md:text-xl text-xs text-white justify-center items-center md:w-10 md:h-10 w-6 h-6 rounded-full bg-stone-700">R</span>
                        <input className="border-b border-gray-200 dark:text-black md:p-2 focus:border-black focus:outline-none placeholder-stone-500 md:text-base text-xs w-full" placeholder="Add a comment..." value={commentInput} onChange={
                            (e) => {
                                setCommentInput(e.target.value)
                            }
                        } />
                    </div>
                    <div className="flex mt-[1%] md:ml-[4%] ml-[8%] gap-2">
                        <button className="md:text-sm md:px-4 md:py-2 px-2 py-1 text-[0.7rem] hover:bg-stone-200 font-semibold rounded-full" onClick={() => {setCommentInput("")}}>Cancel</button>
                        <button className={`md:text-sm md:px-4 md:py-2 px-2 py-1 text-[0.7rem] font-semibold rounded-full ${commentInput ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" :"bg-stone-100 text-stone-500 dark:text-stone-500"}cursor-not-allowed`} disabled={!commentInput} onClick={() => {
                            dispatch(addComment({
                                id: "100",
                                body: commentInput,
                                author: "Riya",
                                replies: [],
                                control: true
                            }))
                            setCommentInput("")
                        }}>Comment</button>
                    </div> 
                </div>
                <CommentList data = {commentsData}/>
            </div>
        </div>

    );
}

export default CommentSection


