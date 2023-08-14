import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';

const Card = ({ response }) => {
    return (
        <div className="glassmorphism w-3/4 h-[75vh] m-4 flex items-center justify-center text-md md:text-2xl text-gray-400 text-center font-mono transition-transform transform hover:scale-105">
            {response ?
                <Typewriter
                    options={{
                        delay: 40, // Adjust the typing speed (lower value means faster typing)
                    }}
                    onInit={(typewriter) => {
                        typewriter.typeString(response)
                            .callFunction(() => {
                                console.log('String typed out!');
                            })
                            .start();
                    }}
                /> :
                <p>
                    Greeting Student! Welcome to PECGPT, an initiative by PEC ACM, your ultimate destination for any and all college-related inquiries. From the initial steps of entering college to navigating through the four enriching years here, we're fully equipped to swiftly address all your queries. So what are you waiting for, go ahead and type your question above – let's get you the answers you need!
                </p>}
        </div>
    );
};

export default Card;
