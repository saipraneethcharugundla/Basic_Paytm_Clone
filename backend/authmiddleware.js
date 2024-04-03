const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "User not signed in",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.userId = decoded.userid2fromdb;
    console.log("User ID:", req.userId);
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({
      msg: "Invalid or expired token",
    });
  }
};

module.exports = {
  authMiddleware,
};
