import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from 'body-parser';

const app = express();
const port = 8080;


const genAI = new GoogleGenerativeAI("AIzaSyB5ejtB_QpueazK_KIKxBNFCZ0Vu-Arc9c");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const preprompt = "Rephrase this text to be less emotionally intense, by about 3 points on a scale from 1 to 10:";


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.text());

app.get('/hello', async (req, res) => {
    var prompt = preprompt + req.body;

    var result = await model.generateContent(prompt);
    console.log(result.response.text());

    res.send(result.response.text());
})
