import express from "express";

const router = express.Router();

// const llm = new OpenAI({
//     openAIApiKey: "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",
// });

// const chatModel = new ChatOpenAI();

// const text =
//     "What would be a good company name for a company that makes colorful socks?";

// const llmResult = await llm.predict(text);
// console.log(llmResult);

// const chatModelResult = await chatModel.predict(text);
// console.log(chatModelResult);

router.post("/", async function (req, res) {});

export default router;
