const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const users = data.users;
const passwordHash = require('password-hash');

router.get("/", (req, res) => {
    res.render("construct/signin", {title: "Sign In"});
});

router.post("/", async (req, res) => {
    const request = req.body
    try {
        const data = await users.getName(request["user"]);
        if(data[0]["userName"] == request["user"] && passwordHash.verify(request["password"], data[0]["hashedPassword"])) {
            res.cookie("user", request["user"], {expire: 360000 + Date.now(), signed: true});
            res.render("construct/user/success", {title: "Sign In Successful!", status: head(req), user: request["user"], operation: ", Welcome Back!"});
        }
        else {
            res.render("construct/signin", {title: "Sign In", status: head(req), error: "Username or password error!"});
        }
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Sign In Failed", status: head(req)});
    }
});

module.exports = router;
