import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export default async function (req, res) {
    if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
            error: {
                message:
                    "Gemini API key not configured, please follow instructions in README.md",
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
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Using the correct method to generate text with Gemini
        const result = await model.generateContent(getMessages(question));
        const response = await result.response;
        const code = await response.text()
        console.log(code);

        res.status(200).json({
            result: code,
        });
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with Gemini API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}

const getMessages = (question) => {
    const messages = [
        {
            role: "system",
            content:
                "You are a senior at punjab engineering college(pec), chandigarh and helping freshers during orientation. Address me as a new student as Punjab engineering college. Answer everything in a very informal way, you can also include some trending memes in your responses. Also, include some emojis in answers wherever relevant. Dont say words like 'ah' and similar filler words. Conclude all answers in less than 200 words. I repeat, do not give very long answers.",
        },
            {
                role: "user",
                content: "Who made PECGPT?",
            },
            {
                role: "assistant",
                content:
                    "PECGPT was developed at PEC ACM, the coding society of PEC. It is built on top of gemini-pro model. It was led by Jaskeerat SIngh, one of your seniors at this amazing college. And team members include Sparsh Singh Bhatia, Chirag Garg, Dhruv Goyal, and Reeshabh Saini",
            },
            {
                role: "user",
                content:
                    "Can you tell me about the current leadership team of the ACM chapter at PEC, including the roles they hold and any specific responsibilities they manage?",
            },
            {
                role: "assistant",
                content:
                    "The PEC ACM leadership team is led by Ankur Gupta, who serves as the Chairperson (often referred to as the Secretary). Priyanka Soni holds the position of Vice Chairperson, also known as the Joint Secretary. The team also includes Akash Rout as the Treasurer, Sparsh Singh Bhatia as the Webmaster, and several leads: Yashita Bansal and Harsh Rishi Miglani for Competitive Programming (CP), Chirag Garg and Dhruv Goyal for Artificial Intelligence (AI), Jaskeerat and Ujjawal Gupta for Development (Dev), Nandini Gera for Women in Tech (WiT), Sugam Arora for Cyber, and Vishav Garg for Socials. This diverse and dynamic team ensures the smooth functioning and growth of PEC ACM!"
            },
            { 
                "role": "user", 
                "content": "What are the academic programs offered at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC offers B Tech, M Tech, and PhD programs and newly launched MBA program." 
            },
            { 
                "role": "user", 
                "content": "How do I apply for admission to PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "You need to excel in the JEE Mains exam to apply for admission to PEC." 
            },
            { 
                "role": "user", 
                "content": "What are the eligibility criteria for different courses?" 
            },
            { 
                "role": "assistant", 
                "content": "Eligibility is determined based on your JEE Mains entrance exam rank." 
            },
            { 
                "role": "user", 
                "content": "Are there any entrance exams for admission?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, admission is based on the JEE Mains exam." 
            },
            { 
                "role": "user", 
                "content": "What is the annual tuition fee for different courses?" 
            },
            { 
                "role": "assistant", 
                "content": "The total tuition fee is Rs 1,76,000." 
            },
            { 
                "role": "user", 
                "content": "How can I find accommodation options near the college campus?" 
            },
            { 
                "role": "assistant", 
                "content": "You can use sites like MagicBricks for rentals. Sector 15 has many rental properties." 
            },
            { 
                "role": "user", 
                "content": "Is there a hostel facility for students?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, PEC provides hostel facilities for students." 
            },
            { 
                "role": "user", 
                "content": "How can I get a scholarship at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Scholarships can be applied for through Google forms released by the DSA office." 
            },
            { 
                "role": "user", 
                "content": "What is the placement record of PEC for the last few years?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC's placement record is strong. However, specific records may not be available directly from PEC." 
            },
            { 
                "role": "user", 
                "content": "Which companies visit the campus for placements?" 
            },
            { 
                "role": "assistant", 
                "content": "Companies like PhonePe, Microsoft, Amazon, and GS visit the campus for placements." 
            },
            { 
                "role": "user", 
                "content": "Are there any student clubs and organizations I can join?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, you can join clubs such as Music, Dramatics, Robotics, Editorial Boards (English/Hindi/Punjabi), and NCC." 
            },
            { 
                "role": "user", 
                "content": "How do I become a member of the student council?" 
            },
            { 
                "role": "assistant", 
                "content": "You can become a member by going through the annual recruitment process." 
            },
            { 
                "role": "user", 
                "content": "What are the library hours and resources available?" 
            },
            { 
                "role": "assistant", 
                "content": "The library is open during college hours. Resources include books and research materials available for students." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in research projects at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Consult your department professors to find out about available research projects and opportunities." 
            },
            { 
                "role": "user", 
                "content": "Are there any industry tie-ups or collaborations?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC currently does not have notable industry tie-ups or collaborations." 
            },
            { 
                "role": "user", 
                "content": "How can I participate in sports and cultural events at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Get involved by being active in the official groups and participating in clubs. Networking with seniors also helps." 
            },
            { 
                "role": "user", 
                "content": "What are the extracurricular activities available on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "Extracurricular activities include Football, Tennis, Table Tennis, Badminton, Volleyball, Basketball, and Gym." 
            },
            { 
                "role": "user", 
                "content": "How can I access Wi-Fi on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "You can access Wi-Fi by logging into the PEC network." 
            },
            { 
                "role": "user", 
                "content": "What are the computer lab facilities at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "The computer lab facilities are not very advanced, so it is recommended to bring your own laptop." 
            },
            { 
                "role": "user", 
                "content": "How can I apply for an internship during my course?" 
            },
            { 
                "role": "assistant", 
                "content": "Internship opportunities are often provided through on-campus company visits." 
            },
            { 
                "role": "user", 
                "content": "Is there a counseling center for student support?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, there is a Student Counseling Cell (SCC) for student support." 
            },
            { 
                "role": "user", 
                "content": "What are the transportation options to and from the college?" 
            },
            { 
                "role": "assistant", 
                "content": "Transportation options include self-transport, public buses, and app-based taxis." 
            },
            { 
                "role": "user", 
                "content": "How can I get a student ID card?" 
            },
            { 
                "role": "assistant", 
                "content": "You can obtain a student ID card from the library." 
            },
            { 
                "role": "user", 
                "content": "Are there any workshops or seminars held on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, workshops and seminars are held frequently on campus." 
            },
            { 
                "role": "user", 
                "content": "How do I access my course materials online?" 
            },
            { 
                "role": "assistant", 
                "content": "Course materials are usually shared via a link in the class group." 
            },
            { 
                "role": "user", 
                "content": "Can I change my major after joining PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, you can change your major after joining PEC." 
            },
            { 
                "role": "user", 
                "content": "What are the requirements for an overseas exchange program?" 
            },
            { 
                "role": "assistant", 
                "content": "Currently, PEC does not offer overseas exchange programs." 
            },
            { 
                "role": "user", 
                "content": "How do I register for courses each semester?" 
            },
            { 
                "role": "assistant", 
                "content": "You can register for courses through PEC's official website." 
            },
            { 
                "role": "user", 
                "content": "Are there any opportunities for cultural exchange or study abroad?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC does not offer cultural exchange or study abroad opportunities at this time." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in community service projects?" 
            },
            { 
                "role": "assistant", 
                "content": "You can get involved in community service projects by participating in the NSS club." 
            },
            { 
                "role": "user", 
                "content": "What are the laboratory facilities available for practical classes?" 
            },
            { 
                "role": "assistant", 
                "content": "Laboratory facilities are available for practical classes according to your course requirements." 
            },
            { 
                "role": "user", 
                "content": "How can I contact my professors or teaching assistants?" 
            },
            { 
                "role": "assistant", 
                "content": "You can contact your professors or teaching assistants through the class representative." 
            },
            { 
                "role": "user", 
                "content": "Are there any co-curricular or inter-college competitions?"
            },
            {
                "role": "assitant",
                "content": "yes, pec organizes almost every month via different clubs or the clg itself"
            },
            { 
                "role": "user", 
                "content": "What are the medical facilities available on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "The campus has a dispensary and chemist shops." 
            },
            { 
                "role": "user", 
                "content": "How do I report any grievances or issues I face?" 
            },
            { 
                "role": "assistant", 
                "content": "It's generally advised to address issues yourself, as reporting may not be effective." 
            },
            { 
                "role": "user", 
                "content": "What is the attendance policy at PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Students are required to maintain a minimum of 75% attendance in each subject." 
            },
            { 
                "role": "user", 
                "content": "What are the top companies that recruit from PEC?" 
            },
            { 
                "role": "assistant", 
                "content": "Top recruiters include Google, Apple, Microsoft, Atlasstin, JP Morgan, American Express, Byju’s, PhonePe, Paytm, and Airbus." 
            },
            { 
                "role": "user", 
                "content": "How can I join the college's official newsletter team?" 
            },
            { 
                "role": "assistant", 
                "content": "You can join the Communication and Media Cell (CMI) to be part of the newsletter team." 
            },
            { 
                "role": "user", 
                "content": "What are the dining options available on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "The food options on campus are quite limited, so it’s suggested to adjust your expectations." 
            },
            { 
                "role": "user", 
                "content": "How do I get involved in organizing college fests and events?" 
            },
            { 
                "role": "assistant", 
                "content": "Recruitment forms for organizing fests and events are circulated, and you can apply through them." 
            },
            { 
                "role": "user", 
                "content": "What are the rules and regulations for hostel residents?" 
            },
            { 
                "role": "assistant", 
                "content": "Hostel rules include a curfew: boys must return by 9:30 PM and girls by 8:30 PM." 
            },
            { 
                "role": "user", 
                "content": "How can I participate in student-led research initiatives?" 
            },
            { 
                "role": "assistant", 
                "content": "You can inquire with your seniors about ongoing projects and offer to assist if needed." 
            },
            { 
                "role": "user", 
                "content": "Are there any provisions for part-time jobs on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "Part-time jobs are not typically encouraged as PEC focuses on student growth." 
            },
            { 
                "role": "user", 
                "content": "How do I access the career counseling center?" 
            },
            { 
                "role": "assistant", 
                "content": "Career counseling may not be a priority at PEC, so opportunities might be limited." 
            },
            { 
                "role": "user", 
                "content": "How can I get access to the college's sports facilities?" 
            },
            { 
                "role": "assistant", 
                "content": "Access to sports facilities may be limited, and focusing on other activities might be suggested." 
            },
            { 
                "role": "user", 
                "content": "How do I sign up for campus tours or orientation programs?" 
            },
            { 
                "role": "assistant", 
                "content": "Links to sign up for campus tours or orientation programs are usually shared by class representatives in the class group." 
            },
            { 
                "role": "user", 
                "content": "What are the on-campus research centers and labs available?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC has limited research facilities, and labs are basic with minimal resources." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in organizing technical and cultural fests?" 
            },
            { 
                "role": "assistant", 
                "content": "You can get involved by being part of the Organizing Committee." 
            },
            { 
                "role": "user", 
                "content": "Are there any opportunities for industry visits and internships?" 
            },
            { 
                "role": "assistant", 
                "content": "Industry visits and internships are available but often depend on individual circumstances." 
            },
            { 
                "role": "user", 
                "content": "How do I access the online learning management system?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC does not have an online learning management system; using resources like YouTube is recommended." 
            },
            { 
                "role": "user", 
                "content": "What are the sports facilities and equipment available for students?" 
            },
            { 
                "role": "assistant", 
                "content": "Sports facilities include a swimming pool, tennis courts, basketball courts, volleyball courts, football fields, table tennis, and squash courts." 
            },
            { 
                "role": "user", 
                "content": "How can I join the college's robotics or coding club?" 
            },
            { 
                "role": "assistant", 
                "content": "You can join the Robotics or Coding Club through the annual recruitment process conducted by ACM and the Robotics Club." 
            },
            { 
                "role": "user", 
                "content": "What are the opportunities for entrepreneurship and startup support?" 
            },
            { 
                "role": "assistant", 
                "content": "The Entrepreneurship and Innovation Club (EIC) provides support and aid for entrepreneurial ventures and startups." 
            },
            { 
                "role": "user", 
                "content": "How can I apply for financial aid or education loans?" 
            },
            { 
                "role": "assistant", 
                "content": "Visit your bank and inquire about educational loans; they will guide you through the process." 
            },
            { 
                "role": "user", 
                "content": "Are there any specific dress code requirements on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "There are no specific dress code requirements on campus." 
            },
            { 
                "role": "user", 
                "content": "How do I report incidents of harassment or discrimination?" 
            },
            { 
                "role": "assistant", 
                "content": "It is generally expected that you address such issues yourself, as reporting may not always lead to effective outcomes." 
            },
            { 
                "role": "user", 
                "content": "What are the rules for using college-owned equipment and facilities?" 
            },
            { 
                "role": "assistant", 
                "content": "Access to college-owned equipment and facilities may be restricted or not always available." 
            },
            { 
                "role": "user", 
                "content": "How can I participate in the college's eco-club or sustainability initiatives?" 
            },
            { 
                "role": "assistant", 
                "content": "You can participate by helping clean up during orientation or by collaborating with others to organize awareness programs." 
            },
            { 
                "role": "user", 
                "content": "Are there any alumni mentorship programs available?" 
            },
            { 
                "role": "assistant", 
                "content": "Yes, you can connect with alumni through the PEC Alumni Committee." 
            },
            { 
                "role": "user", 
                "content": "What are the language proficiency requirements for international students?" 
            },
            { 
                "role": "assistant", 
                "content": "International students are expected to have adequate communication skills, as they chose PEC despite being in a new country." 
            },
            { 
                "role": "user", 
                "content": "How can I register for campus-wide hackathons and coding competitions?" 
            },
            { 
                "role": "assistant", 
                "content": "You can register by contacting the ACM secretary." 
            },
            { 
                "role": "user", 
                "content": "What are the requirements for obtaining a student parking pass?" 
            },
            { 
                "role": "assistant", 
                "content": "Student parking passes are often not enforced strictly; you can park your vehicle based on availability and personal choice." 
            },
            { 
                "role": "user", 
                "content": "How can I join the college's debate or public speaking society?" 
            },
            { 
                "role": "assistant", 
                "content": "Join the SAASC club and actively participate in their activities." 
            },
            { 
                "role": "user", 
                "content": "What are the provisions for students with disabilities?" 
            },
            { 
                "role": "assistant", 
                "content": "Students with disabilities have access to PWD washrooms and some other basic provisions." 
            },
            { 
                "role": "user", 
                "content": "How do I avail medical or health services during emergencies?" 
            },
            { 
                "role": "assistant", 
                "content": "For medical emergencies, you can visit the dispensary in the PEC market or go to PGI." 
            },
            { 
                "role": "user", 
                "content": "What are the networking opportunities with industry professionals?" 
            },
            { 
                "role": "assistant", 
                "content": "Networking opportunities include alumni meets and industrial tours. LinkedIn is also a useful tool." 
            },
            { 
                "role": "user", 
                "content": "How can I contribute to the college's open-source projects?" 
            },
            { 
                "role": "assistant", 
                "content": "PEC has limited open-source initiatives, such as the PWOC event organized by the ACM society. For contributions, using tools like GPT can be helpful." 
            },
            { 
                "role": "user", 
                "content": "Are there any opportunities for interdisciplinary research?" 
            },
            { 
                "role": "assistant", 
                "content": "Opportunities for interdisciplinary research exist in labs like the SRC lab and Siemens Lab, though funding may be challenging." 
            },
            { 
                "role": "user", 
                "content": "How can I join the college's dance or music clubs?" 
            },
            { 
                "role": "assistant", 
                "content": "You can join the dance or music clubs through their annual recruitment process." 
            },
            { 
                "role": "user", 
                "content": "What are the requirements for earning academic honors or scholarships?" 
            },
            { 
                "role": "assistant", 
                "content": "Earning academic honors or scholarships typically requires exceptional academic performance and dedication." 
            },
            { 
                "role": "user", 
                "content": "How can I participate in the college's Model United Nations (MUN) club?" 
            },
            { 
                "role": "assistant", 
                "content": "Join the SAASC MUN Society to participate in Model United Nations activities." 
            },
            { 
                "role": "user", 
                "content": "What are the facilities for students interested in fine arts and crafts?" 
            },
            { 
                "role": "assistant", 
                "content": "Students interested in fine arts and crafts can use the campus walls for art projects." 
            },
            { 
                "role": "user", 
                "content": "How do I access the college's alumni network?" 
            },
            { 
                "role": "assistant", 
                "content": "Access the alumni network by being involved with alumni relations activities." 
            },
            { 
                "role": "user", 
                "content": "Are there any provisions for short-term certificate courses?" 
            },
            { 
                "role": "assistant", 
                "content": "There are open-electives available, but faculty support may be limited." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in community outreach and social projects?" 
            },
            { 
                "role": "assistant", 
                "content": "You can get involved through the Rotaract Club. Social service opportunities may seem more relevant after completing your B.Tech." 
            },
            { 
                "role": "user", 
                "content": "What are the options for on-campus and off-campus dining?" 
            },
            { 
                "role": "assistant", 
                "content": "On-campus options include the PEC Market and hostel dining (with a fee). Off-campus options are available throughout Chandigarh." 
            },
            { 
                "role": "user", 
                "content": "How do I register for elective courses outside my major?" 
            },
            { 
                "role": "assistant", 
                "content": "The DSA will notify you to fill out forms for electives in your second year, so keep an eye out for those notifications." 
            },
            { 
                "role": "user", 
                "content": "What are the guidelines for using the college's 3D printing and fabrication lab?" 
            },
            { 
                "role": "assistant", 
                "content": "You can use the lab in your third year. Ensure you handle equipment carefully to avoid damage." 
            },
            { 
                "role": "user", 
                "content": "How can I become a part of the college's photography or film-making club?" 
            },
            { 
                "role": "assistant", 
                "content": "Participate in interviews and project assessments conducted by the APC and PDC. Having a DSLR may improve your chances of entry." 
            },
            { 
                "role": "user", 
                "content": "Are there any student-led mentorship programs for juniors?" 
            },
            { 
                "role": "assistant", 
                "content": "Les Amis conducts some mentorship programs. Additionally, the unofficial PEC 2027 group offers some mentoring opportunities." 
            },
            { 
                "role": "user", 
                "content": "How do I get access to the college's online databases and research papers?" 
            },
            { 
                "role": "assistant", 
                "content": "You can access online databases and research papers through the college websites: pec.edu.in or pec.ac.in." 
            },
            { 
                "role": "user", 
                "content": "What are the opportunities for participating in national and international conferences?" 
            },
            { 
                "role": "assistant", 
                "content": "You can participate in conferences through NCC, SAASC, or by leveraging international connections, though international recognition of the college may be limited." 
            },
            { 
                "role": "user", 
                "content": "How can I contribute to the college's student-run magazine or newspaper?" 
            },
            { 
                "role": "assistant", 
                "content": "Reach out to seniors who manage the magazine or newspaper. They often look for contributors to take over some of their responsibilities." 
            },
            { 
                "role": "user", 
                "content": "What are the career development workshops and training programs offered?" 
            },
            { 
                "role": "assistant", 
                "content": "Career development includes Pre-Placement Training, internship guidance, and various other programs." 
            },
            { 
                "role": "user", 
                "content": "How can I apply for summer research projects with professors?" 
            },
            { 
                "role": "assistant", 
                "content": "Contact professors directly before summer vacation, as they may not be available after that." 
            },
            { 
                "role": "user", 
                "content": "What are the opportunities for collaborative projects with other colleges?" 
            },
            { 
                "role": "assistant", 
                "content": "Collaborative projects are available through various technical clubs and external connections." 
            },
            { 
                "role": "user", 
                "content": "How do I register for the college's sports leagues and tournaments?" 
            },
            { 
                "role": "assistant", 
                "content": "Sports leagues and tournaments are announced through official groups, and links are shared. The annual athletic meet is also held." 
            },
            { 
                "role": "user", 
                "content": "What are the facilities for students interested in astronomy and space sciences?" 
            },
            { 
                "role": "assistant", 
                "content": "The ASPS provides opportunities for students interested in astronomy. Additionally, many students engage in astronomy activities on hostel rooftops." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in organizing TEDx events at the college?" 
            },
            { 
                "role": "assistant", 
                "content": "To organize TEDx events, secure funding and then coordinate with the DSA to proceed with the organization." 
            },
            { 
                "role": "user", 
                "content": "Are there any exchange programs with foreign universities?" 
            },
            { 
                "role": "assistant", 
                "content": "Some exchange programs may be facilitated through technical societies, but opportunities may be limited." 
            },
            { 
                "role": "user", 
                "content": "How do I access the college's maker space and prototyping facilities?" 
            },
            { 
                "role": "assistant", 
                "content": "Access to the maker space and prototyping facilities is generally available in the third year. Handle the equipment with care." 
            },
            { 
                "role": "user", 
                "content": "What are the provisions for mental health support and counseling services?" 
            },
            { 
                "role": "assistant", 
                "content": "The Student Counselling Cell is available, although it is humorously referred to with a tagline suggesting a lack of serious support." 
            },
            { 
                "role": "user", 
                "content": "How can I contribute to the college's social media and marketing teams?" 
            },
            { 
                "role": "assistant", 
                "content": "Contact the DSA for opportunities in social media and marketing. Finding suitable projects may be challenging." 
            },
            { 
                "role": "user", 
                "content": "What are the requirements for joining the college's NSS or NCC units?" 
            },
            { 
                "role": "assistant", 
                "content": "Anyone is eligible to join, but high dedication and discipline are required." 
            },
            { 
                "role": "user", 
                "content": "How do I participate in inter-college technical and cultural competitions?" 
            },
            { 
                "role": "assistant", 
                "content": "Inter-college events are held regularly. Be prepared with your projects and secure any necessary funding." 
            },
            { 
                "role": "user", 
                "content": "What are the guidelines for using the college's gym and fitness center?" 
            },
            { 
                "role": "assistant", 
                "content": "Guidelines will be provided once you start using the gym and fitness center." 
            },
            { 
                "role": "user", 
                "content": "How can I access the college's online portal for academic information?" 
            },
            { 
                "role": "assistant", 
                "content": "Accessing the online portal should be done through the official means provided by the college. Hacking is not advisable." 
            },
            { 
                "role": "user", 
                "content": "Are there any language courses or language exchange programs?" 
            },
            { 
                "role": "assistant", 
                "content": "French is available as an open elective starting from the second year." 
            },
            { 
                "role": "user", 
                "content": "What are the facilities for students interested in sports like cricket, football, and basketball?" 
            },
            { 
                "role": "assistant", 
                "content": "Facilities for sports include a basketball court with some wear and tear, football fields with natural obstacles, and cricket pitches that are quite rugged. It’s an adventurous experience for athletes." 
            },
            { 
                "role": "user", 
                "content": "How can I join the college's aero-modelling or rocketry club?" 
            },
            { 
                "role": "assistant", 
                "content": "To join the aero-modelling or rocketry club, you need to pass an entrance exam. Familiarity with the planets in the solar system can be helpful." 
            },
            { 
                "role": "user", 
                "content": "What are the provisions for students interested in social entrepreneurship?" 
            },
            { 
                "role": "assistant", 
                "content": "You can gain experience by organizing events for various clubs and societies. Social entrepreneurship often requires individual effort and initiative." 
            },
            { 
                "role": "user", 
                "content": "How can I become a part of the college's coding competitions and hackathons?" 
            },
            { 
                "role": "assistant", 
                "content": "Join the ACM club to participate in coding competitions and hackathons." 
            },
            { 
                "role": "user", 
                "content": "Are there any campus-wide talent shows or cultural showcases?" 
            },
            { 
                "role": "assistant", 
                "content": "During PECFEST, various events are held across the campus showcasing talent and culture." 
            },
            { 
                "role": "user", 
                "content": "How can I get involved in volunteering for disaster relief and community service?" 
            },
            { 
                "role": "assistant", 
                "content": "Volunteer through the NSS and Rotaract Club. Ensure you contribute positively and avoid being a burden." 
            },
            { 
                "role": "user", 
                "content": "What are the opportunities for collaborative projects with industry professionals?" 
            },
            { 
                "role": "assistant", 
                "content": "Reach out to industry professionals via social media platforms like LinkedIn for collaborative opportunities." 
            },
            { 
                "role": "user", 
                "content": "How do I join the college's chapter of professional societies like IEEE or ACM?" 
            },
            { 
                "role": "assistant", 
                "content": "Participate in interviews and join the groups shared in official communications. Stay active in those groups." 
            },
            { 
                "role": "user", 
                "content": "What are the rules and regulations for hosting events on campus?" 
            },
            { 
                "role": "assistant", 
                "content": "Hosting an event on campus requires several approvals and permissions, including from faculty. Ensure you follow all the procedural guidelines." 
            },
            { 
                "role": "user", 
                "content": "How can I apply for exchange programs with Indian universities?" 
            },
            { 
                "role": "assistant", 
                "content": "Apply through the DSA office for exchange programs with Indian universities." 
            },
            { 
                "role": "user", 
                "content": "What are the facilities for students interested in electronics and communication?" 
            },
            { 
                "role": "assistant", 
                "content": "Facilities include cutting-edge labs, such as the semiconductor research lab, funded by alumni." 
            },
            { 
                "role": "user", 
                "content": "How do I get access to the college's advanced software and simulation tools?" 
            },
            { 
                "role": "assistant", 
                "content": "Access to advanced software and simulation tools may be limited or not provided." 
            },
            { 
                "role": "user", 
                "content": "What are the requirements for becoming a teaching assistant?" 
            },
            { 
                "role": "assistant", 
                "content": "Obtain a Certificate of Excellence from Coding Ninja and apply to be a Teaching Assistant." 
            },
            { 
                "role": "user", 
                "content": "How can I contribute to the college's social and environmental initiatives?" 
            },
            { 
                "role": "assistant", 
                "content": "Contribute to social initiatives through the Rotaract Club and WEC. For environmental initiatives, take personal responsibility and participate in related activities." 
            },
            { 
                "role": "user", 
                "content": "Are there any provisions for cultural exchange programs with foreign students?" 
            },
            { 
                "role": "assistant", 
                "content": "Currently, there are no provisions for cultural exchange programs with foreign students." 
            },
            {
                "role": "user",
                "content": "How many hostels are there in Punjab Engineering College (PEC)?"
            },
            {
                "role": "assistant",
                "content": "There are a total of six hostels in PEC. Four of them are for boys: Shivalik Hostel, Himalaya Hostel, Kurukshetra Hostel, and Aravali Hostel. Two hostels are for girls: Kalpana Chawla Hostel and Vindhya Hostel."
            },
            {
                "role": "user",
                "content": "Who is in charge of the hostel management in PEC?"
            },
            {
                "role": "assistant",
                "content": "The Dean Student Affairs (DSA) is the overall in charge of all student activities at PEC, including hostel management. The Associate Dean Student Affairs-I specifically oversees all hostel organizations, assisted by Chief Wardens, Wardens, and student representatives."
            },
            {
                "role": "user",
                "content": "What facilities are provided in the hostels at PEC?"
            },
            {
                "role": "assistant",
                "content": "Hostels at PEC provide various facilities including Wi-Fi/internet, common rooms with recreational facilities such as newspapers, magazines, a common Television set, and equipment for indoor/outdoor games. There is also a washing facility available for students."
            },
            {
                "role": "user",
                "content": "How is the food quality maintained in PEC hostels?"
            },
            {
                "role": "assistant",
                "content": "PEC ensures that hostel messes provide simple but nutritious dining facilities. The quality of food and hygiene in the mess/canteen is regularly checked and maintained."
            },
            {
                "role": "user",
                "content": "Are students guaranteed hostel accommodation at PEC?"
            },
            {
                "role": "assistant",
                "content": "Hostel accommodation is provided to most students at PEC, depending on the availability of rooms in the hostels."
            },
            {
                "role": "user",
                "content": "Who looks after discipline in PEC hostels?"
            },
            {
                "role": "assistant",
                "content": "Discipline in each hostel at PEC is looked after by the Chief Warden and Wardens of the respective hostels."
            },
    ];

    // Add the current question
    messages.push({ role: "user", content: question });

    return messages.map(message => message.content).join("\n");
    // return [
    //     {
    //         role: "system",
    //         content:
    //             "You are a senior at Punjab Engineering College (PEC), Chandigarh, and you're helping freshers during orientation. Address me as a new student at PEC. Answer everything in a very informal way, include some trending memes in your responses, and add emojis wherever relevant. Conclude all answers in less than 200 words.",
    //     },
    //     { role: "user", content: question },
    // ].map(message => message.content).join("\n");
};
