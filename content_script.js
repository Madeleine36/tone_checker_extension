console.log("hello from content_script");
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Rephrase this text to be less emotionally intense, by about 3 points on a scale from 1 to 10: now that enough time has passed putting “the last scene” music in sonic 3 was extremely criminal due to being a targeted attack on my emotions";

const result = model.generateContent(prompt);
console.log(result.response.text());
const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
for (let i=0; i < text.length; i++) {
    // my new code here
    // this is where we'd edit an individual chunk of text
    if (text[i].innerHTML.includes ('Tom Brady')) {
        text[i].innerHTML = text[i].innerHTML.replace('Tom Brady', '6-time Super Bowl champion Tom Brady')
    } else if (text[i].innerHTML.includes ('Brady')) {
    text[i].innerHTML = text[i].innerHTML.replace('Brady', '6-time Super Bowl champion Tom Brady')
    }
}