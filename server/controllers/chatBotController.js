// import OpenAI from "openai";

// export async function chatBot(req, res, next) {
//     const openai = new OpenAI({
//         organization: process.env.OPENAI_ORGANIZATION,
//         apiKey: process.env.OPENAI_KEY,
//     });
//     const { chats } = req.body;

//     const result = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "system",
//                 content:
//                     "You are a EbereGPT. You can help with graphic design tasks",
//             },
//             ...chats,
//         ],
//     });

//     return res.json({
//         output: result.data.choices[0].message,
//     });
// }
