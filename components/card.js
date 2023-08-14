import React from "react";
import TypewriterEffect from "./typewriter";

const Card = ({ response, loading }) => {
    return (
        <div className="glassmorphism w-3/4 min-h-[70vh] m-4 flex items-center justify-center text-md md:text-lg text-gray-400 text-center font-mono transition-transform transform overflow-y-scroll scrollbar-hide">
            {loading ? (
                <img
                    src="/arc-reactor.gif"
                    className="h-[100px] md:h-[200px]"
                />
            ) : response ? (
                <p className="typewriter">
                    <TypewriterEffect text={response} />
                </p>
            ) : (
                <p>
                    Greeting Student! Welcome to PECGPT, an initiative by PEC
                    ACM, your ultimate destination for any and all
                    college-related inquiries. From the initial steps of
                    entering college to navigating through the four enriching
                    years here, we're fully equipped to swiftly address all your
                    queries. So what are you waiting for, go ahead and type your
                    question above - let's get you the answers you need!
                </p>
            )}
        </div>
    );
};

export default Card;
