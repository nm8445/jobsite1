import mongoose from "mongoose"; // imports mongoose into my file

async function dbconnect() {
    console.log("Attemting to connect to mongodb");
    try {
        await mongoose.connect("mongodb://localhost:27017/UserDatabase");
        console.log(" connected successfully");
    } catch (error) {
        console.log("Connection failed");
        console.log("Error details: ", error.message);  
    }
}

// this is the schema that will hold the users
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    }
});

// creating a table within the schema, mongodb makes the collection name lowercase and plural. User = users
const User = mongoose.model('User', userSchema);
// this ensures that the user model and the db connect function can be used in other files. 
// when you have more than one thing you want to export you do it all in one line.
export  {dbconnect, User};
