const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
//const users = data.users;
const head = require("./head");
const comments = data.comments;

router.get("/", async (req, res) => {
    try {
        const data = await tabs.getId(req.query.tabId);
        const commentsData = await comments.getTab(req.query.tabId);
        const deleteId = 'deleteTabs("' + req.query.tabId + '");';
        res.render("construct/tabs/show", {title: data[0]["tabName"], status: head(req), tab: data[0]["tabName"], id: req.query.tabId, delete: deleteId, song: data[0]["songName"], artist: data[0]["artistName"], author: data[0]["author"], content: data[0]["Content"], thumbsup: data[0]["Rating"]["thumbsup"], thumbsdown: data[0]["Rating"]["thumbsdown"], comments: commentsData});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: head(req)});
    }
});

router.get("/newtabs", (req, res) => {
    if(req.signedCookies.user)
        res.render("construct/newTabs", {title: "New Tabs", status: head(req), operation: "upload", author: req.signedCookies.user});
    else
        res.render("construct/index", {title: "Guitar Tabs", status: head(req), error: "You should log in first!"});
});

router.get("/modifytabs/:id", async (req, res) => {
    try{
        const data = await tabs.getId(req.params.id);
        if(req.signedCookies.user)
            res.render("construct/newTabs", {title: "Modify Tabs", status: head(req), operation:"modify", tab: data[0]["tabName"], song: data[0]["songName"], artist: data[0]["artistName"], author: req.signedCookies.user, content: data[0]["Content"]});
        else
            res.render("construct/index", {title: "Guitar Tabs", status: head(req), error: "You should log in first!"});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!"});
    }
});

router.post("/search", async (req, res) => {
    const request = req.body;
    try {
        const name = request["name"];
        const data = await tabs.getName(name);
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
        const data = await tabs.getAuthor(req.query.name);
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
        res.render("construct/tabs/success", {title: "Upload Successfully!", status: head(req), operation: "uploaded"});
    }
    catch(e) {
        res.render("constrcut/tabs/fail", {title: "Upload Failed!", status: head(req)});
    }
});

router.post("/delete", async (req, res) => {
    const request = req.body;
    try {
        const result = await tabs.remove(request["id"]);
        res.render("construct/tabs/success",  {title: "Delete Successfully!", status: head(req), operation: "deleted"});
    }
    catch(e) {
        res.render("constrcut/tabs/fail", {title: "Delete Failed!", status: head(req)});
    }
});

router.post("/modify", async (req, res) => {
    const request = req.body;
    try {
        console.log(request);
        const data = await tabs.getName(request["tabName"]);
        const res1 = await tabs.modifyArtistName(data[0]["_id"], request["artistName"]);
        const res2 = await tabs.modifyContent(data[0]["_id"], request["content"]);
        const res3 = await tabs.modifySongName(data[0]["_id"], request["songName"]);
        const res4 = await tabs.modifyTabName(data[0]["_id"], request["tabName"]);
        res.render("construct/tabs/success",  {title: "Delete Successfully!", status: head(req), operation: "modified"});
    }
    catch(e) {
        res.render("constrcut/tabs/fail", {title: "Delete Failed!", status: head(req)});
    }
});

module.exports = router;
