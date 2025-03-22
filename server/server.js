// File: Server.js 

// using es modules instead of common js because the browser doesnt support it
import cors from "cors";// cross origin request
import express from 'express';
import session from 'express-session';
import { dbconnect, User } from "./mongodb.js";
import bcrypt from "bcryptjs";
import MongoStore from "connect-mongo";


// constant that holds express
const app = express();
app.use(express.json()); // middleware to parse json request bodies. makes req.body work
app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies)
}));// Allow requests from different origins
const PORT = 3000; //assigning port number
const Router = express.Router(); //  constant that hols the express function


// this starts the server and listens for requests
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
});


// use() defines middleware that executes on every request regardless of http method (GET, POST, PUT, DELETE, etc.)
// creating middleware for sessions.
app.use(session({
    secret: 'your-secret-key',
    resave: false, // forces the session to be stored in the database store
    saveUninitialized: false,// forces a session that is new but not modified to the session store
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/UserDatabase',
    }),  
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));


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



/*
Stepes needed to make a session.
the user logs in(server verifies credentials)
a session is created
a unique session id is stored in a cookie
on every request the browser sends the session cookie
server looks up session data
user logs out (session destroyed)
 */
// use async when you are doing database queries or network requests
// this code only executes when theres a post request
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
            // stores the user id from the mongodb database in the session object req.session. I assign a property to req.session called userId which stores the current mogodb id
            // for each document in the database mongodb already has a unique id for it. the syntax is user._id
            req.session.userId = user._id;
            console.log("User ID stored in session:", req.session.userId);
            return res.status(200).json({ message: "Login Successful", success: true });
        } else {
            return res.status(401).json({ message: "Invalid password", success: false});
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
});


app.get('/logout', async (req, res) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session data:", req.session);
    console.log("Session user data:", req.session.userId);
    if (req.session.userId) {
        const userId = req.session.userId; // Retrieve the user ID from the session
        const userID = await User.findById(userId);
        // Fetch the user's profile data from the database
        if (!userID){
            return res.status(500).json({ message: 'Error fetching user data' });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});


// GET route to check if the user is logged in
app.get('/check-loggedin', (req, res) => {
    if (req.session.userId) {
        // If userId exists in the session, return loggedin: true
        return res.json({ loggedin: true });
    } else {
        // If userId doesn't exist in the session, return loggedin: false
        return res.json({ loggedin: false });
    }
});

