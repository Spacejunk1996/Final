const express = require("express");
const router = express.Router();
const head = require("./head");

router.get("/", (req, res) => {
    res.clearCookie("user");
    res.render("construct/user/logout", {title: "Log Out Successful!", status: head(req)});
});

module.exports = router;