const jwt = require("jsonwebtoken");

const AuthmiddleWAre = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded; // contains { id, role }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports=AuthmiddleWAre;