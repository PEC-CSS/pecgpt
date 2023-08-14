import Head from "next/head";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import ChatBox from "@/components/chatBox";
import Card from "@/components/card";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [response, setResponse] = useState("");

    const handleResChange = (newValue) => {
        setResponse(newValue);
        console.log(response)
    };

    return (
        <>
            <Head>
                <title>PECGPT</title>
                <meta
                    name="description"
                    content="Hmm pretty much what you think it is.."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                className={`${inter.className} relative`}
                style={{ overflow: "hidden" }}
            >
                <div
                    className="absolute inset-0 bg-center bg-cover grayscale"
                    style={{
                        backgroundImage: 'url("/jf.gif")',
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        animation: "zoomAnimation 5s infinite alternate",
                        zIndex: -1,
                    }}
                />
                <div className="h-screen p-2 w-full flex flex-col items-center ">
                    <ChatBox handleResChange={handleResChange} />
                    <Card response={response} />
                </div>
            </main>
        </>
    );
}
