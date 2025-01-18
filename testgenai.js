import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Rephrase this text to be less emotionally intense, by about 3 points on a scale from 1 to 10: now that enough time has passed putting “the last scene” music in sonic 3 was extremely criminal due to being a targeted attack on my emotions";

const result = await model.generateContent(prompt);
console.log(result.response.text());
