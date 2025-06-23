// middleware/auth.js
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // expects 'Bearer <token>'
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret must match what was used to sign the token
    req.userId = decoded.id; // assuming the payload includes `id`
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid token" });
  }
};
