import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/utils.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // Validate the input fields
    // Ensure that all fields are provided and valid
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to be filled" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the user already exists
    // If the user already exists, return an error message
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User email already exists" });

    // If the user does not exist, create a new user
    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here to cookies
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {};
export const logout = async (req, res) => {};
