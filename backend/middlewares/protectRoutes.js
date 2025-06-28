import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const protectRoutes = async (req,res,next) =>{
    try {
        const token =req.cookies.jwt;

        if(!token) return res.status(401).json({message: "Unauthorised"});

        const decoded =jwt.verify(token, process.env.JWT_SECERET);

        const user=await User.findById(decoded.userId).select("-password");

        req.user = user;

        next();

    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in protectRoutes", err.message);
    }

};

export default protectRoutes;