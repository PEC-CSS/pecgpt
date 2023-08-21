import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const ChatBox = ({ handleResChange, loading, handleLoadingChange }) => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [gptResponse, setGptResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLoadingChange(true);
        setError(null);

        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
            question: query,
        });

        try {
            let response = await fetch("/api/generate", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
            });

            if (!response.ok) {
                throw new Error(`Error: ${res.error.message}`);
            }

            const res = await response.json();
            setGptResponse(res.result);
        } catch (error) {
            setError(error.message);
        } finally {
            handleLoadingChange(false);
        }
    };

    useEffect(() => {
        if (gptResponse !== "") {
            handleResChange(gptResponse);
        }
    }, [gptResponse, handleResChange]);

    return (
        <form
            className="m-4 w-3/4 flex items-center justify-center gap-1 relative"
            onSubmit={handleSubmit}
        >
            {error && (
                <p className="text-red-500 mt-2 absolute left-0 top-8 z-10 text-sm sm:text-lg">
                    {error}
                </p>
            )}
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                className="w-full p-2 border rounded-lg focus:outline-none shadow shadow-white glassmorphism text-md md:text-xl text-gray-400 font-mono"
                placeholder="Type your message..."
                maxLength={100}
            />
            {loading ? (
                <BiDotsHorizontalRounded className="animate-pulse text-center text-2xl mt-2 text-white absolute right-2 z-10" />
            ) : (
                <button type="submit" className="absolute right-2 z-10">
                    <AiOutlineSend className="text-2xl text-white" />
                </button>
            )}
        </form>
    );
};

export default ChatBox;
