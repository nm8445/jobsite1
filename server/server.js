//using es modules instead of common js because the browser doesnt support it 
import cors from "cors";// cross origin request
import express from 'express';
import { dbconnect, User } from "./mongodb.js";
import bcrypt from "bcryptjs";

// constant that holds express
const app = express();
app.use(express.json()); // middleware to parse json request bodies. makes req.body work
app.use(cors()); // Allow requests from different origins
const PORT = 3000; //assigning port number 

// this starts the server and listens for requests
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
});

dbconnect();
// this is essentially how I grab the info from the endpoint.
app.post('/signup', async(req,res)=>{
    try {
        
        const {firstname,lastname,email,password} = req.body; // I deconstruct the json data (req.body)and assign each value to the local variables.

        

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
    
});

app.post('/login',async(req,res)=>{
    const {email,password} = req.body; // the values of email and password from the fetch request are assigned to local variables
    try {
        const user = await User.findOne({email}); // queries the database and pulls the entire document specific to the email entered.
        if(!user){
            return res.status(404).json({message:"The user with that email doesnt exist"}); // return stops function from executing is email doesnt exist
        }
        if (user.password === password) { // Replace with bcrypt comparison in production
            return res.status(200).json({ message: "Login successful!" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({message:"error occured", error: error.message });
    }
});
