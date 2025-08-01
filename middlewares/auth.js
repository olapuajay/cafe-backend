import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }
    
    token = token.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    req.role = user.role;
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.json({ message: "access denied" })
  }
}

const authorize = (role) => {
  return (req, res, next) => {
    if(req.role === role) {
      next();
    } else {
      return res.json({ message: "Unauthorized Access" });
    }
  };
};

export { authenticate, authorize }