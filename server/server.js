// using es modules instead of common js because the browser doesnt support it 
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

        // saltRounds determines how many times the password runs through the hashing algorithm   
        const saltRounds = 7;
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User({
            firstname,
            lastname,
            email,
            // Store the hashed password
            password: hashedPassword,
        })
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({message:"error creating user", error: error.message });
    }
    
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with that email doesn't exist" });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: "Login successful!" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
});
