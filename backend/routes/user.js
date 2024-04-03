const express = require("express");
const userrouter = express.Router();
const zod = require("zod");
const { Account, User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../authmiddleware");

const zodval = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

userrouter.post("/signup", async (req, res) => {
  check = req.body;
  const parsedcheck = zodval.safeParse(check);
  if (!parsedcheck.success) {
    return res.json({
      msg: "invalid parameters",
    });
  }
  const existinguser = await User.findOne({
    username: req.body.username,
  });
  if (existinguser) {
    return res.json({
      msg: "User already exists",
    });
  }
  const newuser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const useridfromdb = newuser._id;
  console.log(useridfromdb);
  await Account.create({
    userId: useridfromdb,
    balance: Math.random() * 1000,
  });

  res.json({
    message: "User created successfully",
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userrouter.post("/signin", async (req, res) => {
  const signincheck = req.body;
  const parsedchecksignin = signinBody.safeParse(signincheck);
  if (!parsedchecksignin.success) {
    return res.json({
      msg: "invalid input format",
    });
  }
  const signinuser = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const signedinuserdetails = await User.findOne(signinuser);
    if (signedinuserdetails) {
      console.log(signedinuserdetails.firstName);
      const token = jwt.sign(
        {
          userid2fromdb: signedinuserdetails._id,
        },
        JWT_SECRET
      );
      console.log(signedinuserdetails._id);
      res.json({
        msg: "logged in successfully",
        token: token,
      });
    }
  } catch (err) {
    res.json({
      msg: "Cannot Login due to Unknowm Error",
    });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userrouter.put("/", authMiddleware, async (req, res) => {
  const updatecheck = updateBody.safeParse(req.body);
  if (!updatecheck.success) {
    return res.json({
      message: "Invalid Format of inputs",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      msg: "Updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.get("/getfirstname", authMiddleware, async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      msg: "User found successfully",
      gotfirstname: foundUser.firstName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

userrouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = { userrouter };
