// Make sure to include these imports:
 const { GoogleGenerativeAI }  = require("@google/generative-ai");

 require('dotenv').config();


 // this can use for the create a server by Express.js
 const express = require('express') ;
 const app = express();


 // this is a middleware. which is parse the HTTP req.body and provide in req.body . this can be parse the deffrent type data 
 const bodyParser = require('body-parser');
 app.use(bodyParser.json());

// this is PORT Number;
 const port = process.env.PORT;


const api = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(api);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Write a story about a magic backpack.";


const generate  = async(prompt) => {
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();

    }catch(err) {
        console.log(err);
    }
}
// generate();

app.get("/api/content" , async(req , res) => {
    try{
        const data = req.body.question;
        const result = await generate(data);
        res.send({
            "result":result
        })

    }catch(err){
        res.send("error")

    }
    
})

app.listen(port , (req, res) => {
    // res.send("This is first page of website")
    console.log(`Server start at port ${port}`)
})


