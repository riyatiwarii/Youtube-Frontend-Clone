// import { BsPersonCircle} from 'react-icons/bs';
// import { useDispatch, useSelector } from 'react-redux';
// import { addChat } from '../../utils/liveChatSlice';
// import { useEffect, useState } from 'react';

// const ChatMsg = ({user, userMsg}) => {
//     return (
//         <div className='flex justify-center items-center'>
//             <BsPersonCircle className='p-1 md:text-4xl text-sm mb-1 cursor-pointer'></BsPersonCircle>
//             <span className='w-1/4 m-2 font-medium'>{user}</span>
//             <span>{userMsg}</span>
//         </div>
//     )
// }

// const LiveChat = () => {
//     const [userInput, setUserInput] = useState("")
//     const dispatch = useDispatch()
//     const usersLiveChat = useSelector((store) => store.livechat)

//     useEffect(() => {
//         sendChatMsg()
//     }, [])

//     const sendChatMsg = () => {
//         const timer = setInterval(() => {
//             dispatch(addChat({
//                 username: "Riya Tiwari" + Math.round(Math.random(0, 9)),
//                 userChat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//             }))
//         }, 2000)
//         return () => {
//             clearInterval(timer)
//         }
//     }

//     const handleUserInput = () => {
//         dispatch(addChat({
//             username: "Preeti Tiwari",
//             userChat: userInput
//         }))
//     }

//     return (
//         <div className='flex flex-col justify-center items-center'>
//         <div className="flex flex-col-reverse border overflow-scroll h-[550px] border-black w-full m-4">
//             {
//                 usersLiveChat.map((item, index) => {
//                     return <ChatMsg key={index} user = {item.username} userMsg = {item.userChat}/>
//                 })
//             }
//         </div>
//         <div className='flex w-full border border-blue-300'>
//             <input className='w-3/4 bg-slate-100 p-5' value={userInput} onChange={(e) => {
//                 setUserInput(e.target.value)
//             }}></input>
//             <button className='w-1/4 text-blue-950 p-3 flex hover:bg-blue-100 justify-center items-center' onClick={() => {  handleUserInput()}}>Send</button>
//         </div>
//         </div>
//     )
// }

// export default LiveChat