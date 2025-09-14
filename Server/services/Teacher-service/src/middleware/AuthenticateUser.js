import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });

    req.user = decoded; // { id, role }
    next();
  });
};
