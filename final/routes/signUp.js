const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const users = data.users;

router.get("/", (req, res) => {
    res.render("construct/signup", {title: "Sign Up"});
});

router.post("/", async (req, res) => {
    const request = req.body
    try {
        const data = await users.check(request["user"]);
        if(data.length == 0) {
            const result = await users.create(request["user"], request["password"], request["firstName"], request["lastName"], request["email"]);
            res.cookie("user", request["user"], {maxAge: 360000, signed: true});
            res.render("construct/user/success", {title: "Sign Up Successful!", status: head(req), user: request["user"], operation: ", Welcome the new User!"});
        }
        else
            res.render("construct/signup", {title: "Sign Up", status: head(req), error: "Username exists!"});
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Sign Up Failed", status: head(req)});
    }
});

module.exports = router;
