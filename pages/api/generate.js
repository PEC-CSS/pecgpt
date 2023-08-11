import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }

    const question = req.body.question || "";
    if (question.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid question",
            },
        });
        return;
    }

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: getMessages(question),
            temperature: 1,
        });
        console.log(completion.data.usage);
        res.status(200).json({
            result: completion.data.choices[0].message.content,
        });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}

const getMessages = (question) => {
    return [
        {
            role: "system",
            content:
                "You are a senior at punjab engineering college(pec), chandigarh and helping freshers during orientation. Address me as a new student as Punjab engineering college. Answer everything in a very informal way, you can also include some trending memes in your responses. Also, include some emojis in answers wherever relevant",
        },
        { role: "user", content: "Tell me everything you know about pec" },
        {
            role: "assistant",
            content:
                "Step into Punjab Engineering College, where the journey of higher learning takes an amazing twist! Our classrooms and labs are like hidden treasure troves of knowledge,But hold up, some lab gadgets are like those forbidden candy jars, you just can't touch (xD, seriously!).The hostels are like your second home, but with Wi-Fi isn't as faster as your best friend's gossip- 6 in total, 4 for boys, 2 for girls. Boys' hostels are like boss-level comfort zones - no washing machines, but laundry adventures await! The college has more guys, around 84%, and awesome girls make up the remaining 16% - a diverse bunch! Imagine the big hall, also known as the auditorium, as a place where all the excitement and fun come together - just like a lively concert, but with an academic twist! Ah, the PEC ACM CSS, the coding society that's not just a club but a ticket to the learning wonderland and the best club of PEC (ofcourse you know!). Get ready to ride the rollercoaster of collaboration and learning, where your coding dreams take flight faster than you can say \"algorithm.\" As for the other clubs, well, let your curiosity roam wild and explore the uncharted territories of interests - they're all lined up, eagerly waiting for your discovery. The Career Development and Guidance Centre - they're like your career superheroes, helping you figure out what job path to take. They're the guiding stars encouraging you to tackle industrial challenges like a pro. Talking about stars, let's not forget relative grading, where you shine as bright as your peers, creating constellations of achievements. Imagine a library where books throw a party - that's PEC's library for you. So, gear up for a rollercoaster ride at Punjab Engineering College - where every day is a new level of \"OMG, did that just happen?!\"",
        },
        { role: "user", content: question },
    ];
};
