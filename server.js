import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8080;


const genAI = new GoogleGenerativeAI("AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const preprompt = "Rephrase this text to be less emotionally intense, by about 3 points on a scale from 1 to 10. I will give you the inputs as a list of strings, please have the outputs be a list of strings as well:";
const preprompt_minus_one = "Rephrase this text to be somewhat less emotionally intense, by about 3 points on a scale from 1 to 10. I will give you the inputs as a list of strings, please have the outputs be a list of strings as well:";
const preprompt_minus_two = "Rephrase this text to be totally neutral, unbiased, and nonchalant. I will give you the inputs as a list of strings, please have the outputs be a list of strings as well, using double quote marks:"
const preprompt_one = "Rephrase this text to be somewhat more emotional and negative, by about 3 points on a scale from 1 to 10. I will give you the inputs as a list of strings, please have the outputs be a list of strings as well:"
const preprompt_two = "Rephrase this text to be way more emotional, and hostile (it's okay to use profanity). I will give you the inputs as a list of strings, please have the outputs be a list of strings as well:"
app.use(cors());
app.use(cors({
    origin: 'https://motherfuckingwebsite.com',
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
            prompt = preprompt + req.body;
            break
        default:
            console.log("default case")
            prompt = preprompt + req.body;
    }


    // var prompt = preprompt + req.body;
    console.log("prompting with prompt: " + prompt)

    var result = await model.generateContent(prompt);

    var lines = (result.response.text()).split('\n');
    lines.shift();
    lines.pop();
    lines.pop();
    var finstr = lines.join('\n');
  
    console.log("response gotten: " + finstr);
    res.send(finstr);
})
