import Head from "next/head";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import ChatBox from "@/components/chatBox";
import Card from "@/components/card";
import Header from "@/components/header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResChange = (newValue) => {
        setResponse(newValue);
    };

    const handleLoadingChange = (loadingValue) => {
        setLoading(loadingValue);
    };

    return (
        <>
            <Head>
                <title>PecGPT</title>
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
                className={`${inter.className} relative scrollbar-hide`}
                style={{ overflow: "hidden" }}
            >
                <div
                    className="absolute inset-0 bg-center bg-cover grayscale scrollbar-hide"
                    style={{
                        backgroundImage: 'url("/3.png")',
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        zIndex: -1,
                    }}
                />
                <div className="min-h-screen p-2 w-full flex flex-col items-center scrollbar-hide">
                    <Header />
                    <ChatBox
                        handleResChange={handleResChange}
                        loading={loading}
                        handleLoadingChange={handleLoadingChange}
                    />
                    <Card response={response} loading={loading} />
                    <p className="text-white font-semibold">
                        Made with ❤️ by{" "}
                        <a
                            className="font-bold"
                            href="https://github.com/PEC-CSS"
                            target="_blank"
                            referrerPolicy="no-referrer"
                        >
                            PECACM
                        </a>
                    </p>
                </div>
            </main>
        </>
    );
}
