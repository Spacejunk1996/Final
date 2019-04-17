const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/:id", (req, res) => {
    if(req.signedCookies.user)
        res.render("construct/modify", {title: "New Tabs", status: head(req), user: req.signedCookies.user});
    else
        res.render("construct/index", {title: "Guitar Tabs", status: head(req), error: "You should log in first!"});
});

router.post("/", (req, res) => {
    
});

module.exports = router;
