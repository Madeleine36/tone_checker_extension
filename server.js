import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;


const genAI = new GoogleGenerativeAI("AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const preprompt_instructions = "I will give you the inputs as a list of strings, please have the outputs be a list of strings as well, using double quotes:";
const preprompt_minus_one = "Rephrase this text to be somewhat less emotionally intense, by about 3 points on a scale from 1 to 10. " + preprompt_instructions;
const preprompt_minus_two = "Rephrase this text to be totally neutral, unbiased, and nonchalant. " + preprompt_instructions;
const preprompt_one = "Rephrase this text to be somewhat more emotional and negative, by about 3 points on a scale from 1 to 10. " + preprompt_instructions;
const preprompt_two = "Rephrase this text to be way more emotional, and hostile (it's okay to use profanity). " + preprompt_instructions;
app.use(cors());
app.use(cors({
    origin: '*',
  }));  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.text());

app.post('/translate/:level', async (req, res) => {
    if (typeof req.body == "undefined" || req.body.length  < 10) {
        console.log("small request, not using ai");
        res.send(req.body);
        return;
    }

    var lvl = Number(req.params.level);
    console.log("level is ");
    console.log(lvl);
    var prompt;
    console.log(typeof(lvl))
    switch (lvl) {
        case -1:
            prompt = preprompt_minus_one + req.body;
            break
        case -2:
            prompt = preprompt_minus_two + req.body;
            break
        case 1:
            prompt = preprompt_one + req.body;
            break
        case 2:
            prompt = preprompt_two + req.body;
            break
        case 0:
            prompt = preprompt_minus_one + req.body;
            break
        default:
            console.log("default case")
            prompt = preprompt_minus_one + req.body;
    }


    // var prompt = preprompt + req.body;
    console.log("prompting with prompt: " + prompt)

    var result = await model.generateContent(prompt);

    var base = result.response.text();
    var frontTrimmed = base.substring(base.indexOf('['));
    var trimmed = frontTrimmed.substring(0, frontTrimmed.lastIndexOf(']') + 1);

    console.log("\n\n\n\n\n\n\nresponse gotten: " + trimmed);
    res.send(trimmed);
})
