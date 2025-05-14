const express = require("express");
const authMiddleware = require("../middlewear/authmiddlewear");
const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const signupValidations = require("../validations/signupValidation")

const router = express.Router();



router.post("/signup", async (req, res) => {
    try {
        const { userName, email, password,phone,city } = req.body;
        console.log(req.body);
        

        const errors = signupValidations(req.body)
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            userName,
            email,
            phone,
            city,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Sign up successful" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        // Step 1: Check if the required fields are provided

        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Step 2: Check if the user exists
        const userExist = await userModel.findOne({ email });
        console.log(userExist,"yse");

        if (!userExist) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Step 3: Check if the password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, userExist.password);
        console.log("userpass",isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or passwor" });
        }

        // Step 4: Successful login - Send a response (you could also create a JWT here)
        payload = {
            id: userExist._id
        }
        const token = jwt.sign(payload, secret_key)
        res.status(200).json({ message: "Login successful", token: token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/getUser", authMiddleware, async (req, res) => {
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

router.put("/updateUser", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, old_password, password } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update name/email if provided
        if (name) user.Name = name;
        if (email) user.Email = email;

        // If new password is provided, check old password first
        if (password) {
            if (!old_password) {
                return res.status(400).json({ message: "Old password is required to set a new password" });
            }

            const isMatch = await bcrypt.compare(old_password, user.Password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            if (old_password === password) {
                return res.status(400).json({ message: "New password cannot be the same as the old password" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.Password = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Delete Account API
router.delete("/deleteUser", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
 

