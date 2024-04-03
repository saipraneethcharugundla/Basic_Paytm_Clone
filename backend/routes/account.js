const express = require("express");
const accountrouter = express.Router();
const { authMiddleware } = require("../authmiddleware");
const { Account } = require("../db");
const mongoose = require("mongoose");
const zod = require("zod");

accountrouter.get("/balance", authMiddleware, async (req, res) => {
  const accountfetched = await Account.findOne({
    userId: req.userId,
  });
  if (!accountfetched) {
    return res.json({
      msg: "user not found",
    });
  }

  res.status(200).json({
    remaining_balance: accountfetched.balance,
    msg: "Balance fetched successfully",
  });
});

accountrouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = { accountrouter };
