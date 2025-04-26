const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const connectDb = require("./config/db")
const userModel = require("./models/user")
secret_key = "hdcndjncdljvckdsjnc5352adscsacf";
const port = 1234

const app = express()
connectDb();

// app.use(cors())

app.use(cors({
    origin: "http://localhost:5173"

}));

app.use(express.json()); // for parsing application/json


app.post("/api/signup", async (req, res) => {
    try {
        const { Name, Email, Password, CnfrmPassword } = req.body;


        // Step 1: Check required fields
        if (!Name || !Email || !Password || !CnfrmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Step 2: Check if passwords match
        if (Password !== CnfrmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Step 3: Check if user already exists
        const existingUser = await userModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Step 4: Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Step 5: Create and save the user
        const newUser = new userModel({
            Name,
            Email,
            Password: hashedPassword,
            // Cnfrmpassword: hashedPassword, // optional: or don't store it at all
        });

        await newUser.save();

        res.status(201).json({ message: "Sign up successful" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.post("/api/login", async (req, res) => {
    try {

        const { Email, Password } = req.body;

        // Step 1: Check if the required fields are provided
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Step 2: Check if the user exists
        const existingUser = await userModel.findOne({ Email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Step 3: Check if the password matches the hashed password in the database
        const isMatch = await bcrypt.compare(Password, existingUser.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Step 4: Successful login - Send a response (you could also create a JWT here)
        payload = {
            email: existingUser.Email,
            id: existingUser._id
        }
        const token = jwt.sign(payload, secret_key)
        res.status(200).json({ message: "Login successful", token: token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const verifyToken = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    try {
        const decoded = jwt.verify(token, secret_key); // Replace with your secret
        req.user = decoded; // Store user information

        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};


app.get("/api/getUser", verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);  

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ name: user.Name, email: user.Email });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log("server started");

})
// http://localhost/1234/api/signup