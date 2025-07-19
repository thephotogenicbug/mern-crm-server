import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerAgent = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.json({
      success: false,
      message: "something went wrong while creating agent account",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.json({
      success: false,
      message: "agent account already exists please login",
    });
  }

  const user = new userModel({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });
  await user.save();
  return res.json({
    success: true,
    message: "agent account created successfully",
    user: user,
  });
};

export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Invalid credentials try again",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "account does not exist please register user account",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d exp time for cookie
    });

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
