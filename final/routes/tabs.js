const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;
const head = require("./head");

router.get("/", async (req, res) => {
    try {
        const data = await tabs.getId(req.query.tabId);
        res.render("construct/tabs/show", {title: data[0]["tabName"], status: head(req), tab: data[0]["tabName"], song: data[0]["songName"], artist: data[0]["artistName"], author: data[0]["author"], content: data[0]["Content"], thumbsup: data[0]["Rating"]["thumbsup"], thumbsdown: data[0]["Rating"]["thumbsdown"]});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: head(req)});
    }
});

router.get("/newtabs", (req, res) => {
    if(req.signedCookies.user)
        res.render("construct/newTabs", {title: "New Tabs", status: head(req), author: req.signedCookies.user});
    else
        res.render("construct/index", {title: "Guitar Tabs", status: head(req), error: "You should log in first!"})
})

router.post("/search", async (req, res) => {
    const request = req.body;
    try {
        const name = request["name"];
        const data = await tabs.getName(name);
        console.log(data);
        if(data.length != 0) 
            res.render("construct/search", {title: "Search result", status: head(req), data: data});
        else
            res.render("construct/search", {title: "Search result", status: head(req), error: "Not found"});
    }
    catch(e) {
        res.render("constrcut/error", {title: "Error!", status: head(req)});
    }
});

router.get("/mytabs", async (req, res) => {
    try {
        const data = await tabs.getName(req.query.name);
        if(data.length != 0) 
            res.render("construct/tabs/my", {title: "My Tabs", status: head(req), data: data});
        else
            res.render("construct/tabs/my", {title: "My Tabs", status: head(req), error: "No Tabs"});
    }
    catch(e) {
        res.render("constrcut/error", {title: "Error!", status: head(req)});
    }
});

router.post("/upload", async (req, res) => {
    const request = req.body;
    try {
        const result = await tabs.create(request["tabName"], request["songName"], request["artistName"], request["authorName"], request["content"]);
        res.render("construct/tabs/success", {title: "Upload Successfully!", status: head(req)});
    }
    catch(e) {
        res.render("constrcut/tabs/fail", {title: "Upload Failed!", status: head(req)});
    }
});

router.delete("/:id", async (req, res) => {

});

module.exports = router;
