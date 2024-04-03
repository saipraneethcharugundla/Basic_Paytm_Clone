const express = require("express");
const app = express();
const rootrouter = express.Router();
const { userrouter } = require("./user");
const { accountrouter } = require("./account");

rootrouter.use("/user", userrouter);
rootrouter.use("/account", accountrouter);

module.exports = { rootrouter };
