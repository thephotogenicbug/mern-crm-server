import jwt from "jsonwebtoken";

export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: "no token available in cookies",
    });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded_token;
  } catch (error) {
    return res.json({
      success: false,
      message: "token provided is invalid / expired",
    });
  }
};
