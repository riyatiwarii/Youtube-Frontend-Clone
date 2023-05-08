import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../utils/commentsSlice";

const CommentSection = () => {

    const [commentInput, setCommentInput] = useState("")
    const dispatch = useDispatch()
    const commentsData = useSelector((store) => store.comments.commentitems)

    const Comment = ({data}) => {
        const { id, author, body } = data;
        return (
            <div class="flex gap-3">
                <span class="flex text-2xl text-white justify-center items-center w-10 h-10 rounded-full bg-stone-700">{author.slice(0, 1).toUpperCase()}</span>
                <div class="flex-col">
                    <span class="text-sm font-medium">{author}</span>
                    <p class="dark:text-white text-gray-800 text-sm mt-1">{body}</p>
                </div>
            </div>
        )
    }

    const CommentList = ({ data }) => {
        return data?.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment data={comment} />
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-5 p-2 flex flex-col gap-2 ml-5 border-l-2 border-black">
                  <CommentList data={comment.replies} />
                </div>
              )}
            </div>
          );
        });
      };      
      

    return (
        <div class="w-[950px] dark:text-gray-100 dark:bg-black duration-100">
            <div class="flex flex-col justify-center gap-2 py-4">
                <div className="flex-col">
                    <div className="flex gap-2">
                        <span class="flex text-2xl text-white justify-center items-center w-10 h-10 rounded-full bg-stone-700">R</span>
                        <input class="border-b border-gray-200 dark:text-black p-2 focus:border-black focus:outline-none placeholder-stone-500 w-full" placeholder="Add a comment..." value={commentInput} onChange={
                            (e) => {
                                setCommentInput(e.target.value)
                            }
                        } />
                    </div>
                    <div class="flex mt-[1%] ml-[4%] gap-2">
                        <button class="text-sm px-4 py-2 hover:bg-stone-200 font-semibold rounded-full">Cancel</button>
                        <button class={`text-sm px-4 py-2 font-semibold rounded-full ${commentInput ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" :"bg-stone-100 text-stone-500 dark:text-stone-500"}cursor-not-allowed`} disabled={!commentInput} onClick={
                            dispatch(addComment({
                                id: "13",
                                body: commentInput,
                                author: "Riya",
                                replies: []
                            }))
                        }>Comment</button>
                    </div> 
                </div>
                <CommentList data = {commentsData}/>
            </div>
        </div>


    );
}

export default CommentSection


