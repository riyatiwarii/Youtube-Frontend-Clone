import {AiOutlineSend} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../../utils/liveChatSlice';


const UserChat = ({user, userMsg}) => {
    
    return (
        <div className="flex gap-2 items-center">
            <span className="flex text-xs text-white justify-center items-center w-6 h-6 rounded-full bg-stone-700 mr-2 flex-shrink-0">{user.slice(0, 1).toUpperCase()}</span>
            <div className="text-neutral-500 font-medium flex-shrink-0 w-16">{user}</div>
            <div className="text-sm">{userMsg}</div>
        </div>
    )
}

const LiveChat = () => {
    const [liveChat, setLiveChat] = useState(true)
    function handleChat(){
        setLiveChat(!liveChat)
    }
    const [userInput, setUserInput] = useState("")
    const dispatch = useDispatch()
    const usersLiveChat = useSelector((store) => store.livechat)

    useEffect(() => {
        sendChatMsg()
    }, [])

    function generateRandomName() {
        const names = ["Preeti", "Savinder", "Bharat", "Mayur", "Atul", "Laxmi", "Riya", "Ambika", "Akanksha", "Gilmaan", "Aarti", "Bhavana", "Anjali", "Divya", "Esha", "Farhan", "Gaurav", "Himani", "Ishaan", "Jhanvi", "Kapil", "Lata", "Madhuri", "Nehal", "Omkar", "Pranav", "Rajat", "Sahil", "Tanvi", "Urvashi", "Varun", "Yash", "Zainab", "Aayush", "Chirag", "Daksha", "Eshita"]
        return names[Math.floor(Math.random() * names.length)];
      }
      
    function generateRandomChatMessage() {
        const messages = [
            "Great content, really enjoying the stream! 😃",
            "Thanks for sharing this information, it's really important 😍",
            "You're doing an amazing job, keep up the great work! 👏",
            "This is one of the best streams I've watched in a while, thank you! 🤩",
            "I'm learning so much from this, thank you for sharing your knowledge 🧠",
            "I love how interactive this stream is, it really feels like a community ❤️",
            "Wow, this is fascinating. I can't wait to learn more 🤔",
            "Thank you for taking the time to do this, it's really appreciated 🙏",
            "This is a really important topic, thank you for shedding light on it 💡",
            "This is the kind of content I've been looking for, thank you! 😎",
            "This is amazing! 😍",
            "Thank you for creating this awesome content! 🤗",
            "I'm really enjoying this stream, thanks for doing it! 👍",
            "This is exactly what I needed to hear today, thank you! 🙌",
            "I'm learning so much from this, thank you for sharing your expertise! 🤓",
            "You're making a real difference with this content, keep it up! 👏",
            "I'm blown away by how informative this stream is, thank you! 🤯",
            "This is the highlight of my day, thank you for doing this! 🌞",
            "I appreciate the effort you're putting into this, thank you! 🤗",
            "You're a fantastic host, keep up the great work! 😃",
            "This is so interesting, I can't wait to see what's next! 🤔",
            "I'm really impressed by your knowledge, thank you for sharing it! 🧠",
            "You're doing an amazing job of explaining this, thank you! 👍",
            "This is such an important topic, thank you for bringing attention to it! 💪",
            "I'm really enjoying the interactive elements of this stream, thank you! 🤩",
            "This is exactly what I needed to hear today, thank you! 😊",
            "I'm blown away by the depth of knowledge being shared here, thank you! 🤓",
            "You're making a real difference with this content, keep it up! 🙌",
            "I'm loving this stream, thank you for doing it! 😍",
            "This is exactly the kind of content I was hoping for, thank you! 😎",
            "I'm learning so much from this, thank you for sharing your expertise! 👏",
            "This is so well put together, thank you for the effort you're putting in! 🤗",
            "I'm really impressed by the quality of this content, thank you! 🌟",
            "This is an eye-opening stream, thank you for doing it! 👀",
            "I can't believe how much I'm learning from this, thank you! 🤯",
            "You're doing a fantastic job of keeping us engaged, thank you! 👌",
            "This is so valuable, thank you for creating it! 💎",
            "I'm really enjoying this stream, thank you for doing it! 😃",
            "This is such an important topic, thank you for bringing it to light! 💡",
            "I'm loving the positive energy of this stream"
        ]          
          
        return messages[Math.floor(Math.random() * messages.length)];
    }

    const sendChatMsg = () => {
        const timer = setInterval(() => {
            dispatch(addChat({
                username: generateRandomName(),
                userChat: generateRandomChatMessage()
            }))
        }, 4000)
        return () => {
            clearInterval(timer)
        }
    }

    const handleUserInput = () => {
        dispatch(addChat({
            username: "Riya",
            userChat: userInput
        }))
        setUserInput("")
    }
    return (
        <div className={` w-full flex border border-stone-300 flex-col ${liveChat ? "h-auto" : "h-10"}`}>
            <div className="bg-white border-b border-gray-200">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
                    <div className="font-bold text-lg text-gray-800">Live Chat</div>
                    <button className="text-blue-600" onClick = {handleChat}>{liveChat ? "Hide Chat" : "Show Chat"}</button>
                </div>
            </div>
            {
                liveChat && <>
            <div className="flex-grow px-4 py-2">
                <div className="flex flex-col-reverse overflow-y-scroll xl:h-[485px] lg:h-[409px] h-[200px] space-y-4">
                    {
                        usersLiveChat.map((item, index) => {
                            return <UserChat key={index} user = {item.username} userMsg = {item.userChat}/>
                        })
                    }
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <form className="flex items-center">
                    <input
                        type="text"
                        placeholder="Say something..."
                        className="flex-grow border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:border-blue-600"
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value)
                        }}
                    />
                    <button disabled={!userInput} onClick={handleUserInput}><AiOutlineSend className='text-2xl text-blue-600 cursor-pointer' ></AiOutlineSend></button>
                    </form>
                </div>
            </div>
            </>
            }
        </div>

    )
}

export default LiveChat