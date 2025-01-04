import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized, login again" });
        }    
        const token = authHeader.split(" ")[1];
        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token matches the expected admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        // Add the decoded token information to the request object for further use
        req.user = token_decode;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in adminAuth middleware:", error.message);
        return res.status(500).json({ success: false, message: "Authentication failed" });
    }
};

export default adminAuth;

 