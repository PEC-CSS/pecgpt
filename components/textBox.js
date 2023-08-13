import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi"
const ChatBox = () => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const conversationContainerRef = useRef(null);

    useEffect(() => {
        if (conversationContainerRef.current) {
            conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        setIsLoading(true); // Set loading state

        // Add user message to conversation
        setConversation((prev) => [...prev, { text: inputText, type: 'user' }]);
        setInputText('');

        try {
            // Simulate AI response with delay
            const response = await simulateAIResponse(inputText);
            setConversation((prev) => [...prev, { text: response, type: 'ai' }]);
        } catch (error) {
            // Handle error
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const simulateAIResponse = (inputText) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("AI's response goes here.");
            }, 500);
        });
    };

    return (
        <div className="flex flex-col justify-between h-screen p-2 w-full">
            <form className="p-4 w-full flex items-center justify-center gap-1" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    className="w-3/4 p-2 border rounded-lg focus:outline-none shadow shadow-white"
                    placeholder="Type your message..."
                />
                {isLoading ? (
                    <BiDotsHorizontalRounded className="animate-pulse text-center text-3xl mt-2 text-white" />
                ) :
                    <button type='submit'>
                        <AiOutlineSend className='text-3xl text-white' />
                    </button>
                }
            </form>
            <div className="flex-grow pb-2 px-2 overflow-y-auto" ref={conversationContainerRef}>
                {conversation.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                    >
                        <span
                            className={`inline-block p-2 rounded-lg ${message.type === 'user' ? 'bg-[#F4F0DB]' : 'bg-[#FFFAF1]'}`}
                            style={{
                                maxWidth: '80%',
                                wordWrap: 'break-word',
                            }}
                        >
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;
