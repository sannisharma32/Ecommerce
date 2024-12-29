import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
};


// router for register
const ragisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                succes: false,
                message: "User already exists"
            })

        }
        //validating email and strong password 
        if (!validator.isEmail(email)) {
            return res.json({
                succes: false,
                message: "please enter a valid email"
            })

        }
        if (password.length < 8) {
            return res.json({
                succes: false,
                message: "password is too short "
            })
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //creating new user

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,

        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({
            succes: true,
            message: "user created successfully",
            token
        })


    } catch (error) {
        console.log(error)
        res.json({ succes: false, message: error.message })

    }


}

// router for login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // 2. Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // 4. Create JWT Token
        const token = createToken(user._id);

        // 5. Send success response
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again later."
        });
    }
};

// Routerfor adminlogin

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token
            const token = jwt.sign(
                { email }, // Payload should be an object (e.g., email)
                process.env.JWT_SECRET,
                { expiresIn: "1h" } // Add token expiration for security
            );

            return res.json({
                success: true,
                token,
            });
        } else {
            // Unauthorized access
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error("Admin Login Error:", error);

        // Internal server error
        res.status(500).json({
            success: false,
            message: "An error occurred during admin login. Please try again later.",
        });
    }
};


export { loginUser, ragisterUser, adminlogin }