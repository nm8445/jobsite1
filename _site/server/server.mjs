//using es modules instead of common js because the browser doesnt support it 
import express from "express";
import { dbconnect, User } from "./mongodb.mjs";

// constant that holds express
const app = express();
app.use(express.json()); // middleware to parse json request bodies. makes req.body work

const PORT = 3000; //assigning port number 

// this starts the server and listens for requests
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
});

dbconnect();
// this is essentially how I grab the info from the endpoint.
app.post('/signup', async(req,res)=>{
    try {
        const {firstname,lastname,email,password} = req.body; // i deconstruct the json data (req.body)and assign each value to the local variables.
        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
        })
        await newUser.save();
        res.status(201).json({message:"user created successfully" + JSON.stringify(newUser) });
    } catch (error) {
        res.status(500).json({message:"error creating user", error: error.message });
    }
    
})
