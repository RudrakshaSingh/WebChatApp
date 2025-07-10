import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;// Assuming the token is stored in cookies named jwt

    if (!token) {
      return res
        .status(401)
        .json({ message: " Unauthorized - Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;// Attach user to request object for further use in the route handlers

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error in protectedRoute" });
  }
};
