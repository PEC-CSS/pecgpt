import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const [query, setQuery] = useState();
    const [loading, setLoading] = useState(false);

    const [gptResponse, setGptResponse] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
            question: query,
        });

        let response = await fetch("/api/generate", {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });
        
        const res = await response.json();

        setGptResponse(res.result);
        setLoading(false);
    };
    return (
        <>
            <Head>
                <title>PEC-GPT: Bridging Tech and Freshman Welcomes</title>
                <meta
                    name="description"
                    content="Exploring AI-Powered Guidance for PEC's First-Year Experience"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-black w-screen min-h-screen flex align-center flex-col p-5">
                <p className="text-center text-white absolute bottom-0 left-1/2 -translate-x-[50%]">
                    Made with ❤️ by PECACM
                </p>
                <h1 className="text-white font-mono font-bold text-[2rem] text-center">
                    Welcome to PECGPT
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full justify-center"
                >
                    <input
                        type="text"
                        className="w-[80%] mx-auto outline-none px-2 py-1 font-mono h-10 my-10 rounded-md border-none bg-slate-600 text-white"
                        maxLength={100}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </form>
                {loading ? (
                    <img
                        src="/arc-reactor.gif"
                        className="w-[60%] mx-auto"
                        alt="Arc Reactor"
                    />
                ) : (
                    <img
                        src="/still.jpg"
                        className="w-[60%] mx-auto opacity-50"
                        alt="Arc Reactor"
                    />
                )}

                <p className="text-white">{loading ? "Generating response..." : gptResponse}</p>
            </main>
        </>
    );
}
