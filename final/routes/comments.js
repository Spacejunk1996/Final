const express = require("express");
const router = express.Router();
const data = require("../data");
const comments = data.comments;
const users = data.users;
const head = require("./head");

/*router.get("/:id", (req, res) => {

});
*/
router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const userInfo = await users.getName(data["commentAuthor"]);
        const userId = userInfo[0]["_id"].toString();
        const result = await comments.create(data["tabId"], data["commentAuthor"], userId, data["content"]);
        res.render("construct/comments/success", {title: "Post the Comment Successfully!", status: head(req), id: data["tabId"], operation: "posted"});
    }
    catch(e) {
        res.render("construct/comments/fail", {title: "Post the Comment Failed!", status: head(req)});
    }
});

/*router.post("/upload", (req, res) => {

});

router.delete("/:id", (req, res) => {

});*/

module.exports = router;
