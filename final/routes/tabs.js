const express = require("express");
const router = express.Router();
const data = require("../data");
const tabs = data.tabs;
const users = data.users;

router.get("/:id", async (req, res) => {
    try {
        const data = await tabs.getId(req.params.id);
        res.render("construct/tabs/show", {title: data[0]["tabName"], song: data[0]["songName"], artist: data[0]["artistName"], author: data[0]["author"], content: data[0]["Content"], thumbsup: data[0]["Rating"]["thumbsup"], thumbsdown: data[0]["Rating"]["thumbsdown"]});
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
            res.render("construct/search", {title: "Search result", data: data});
        else
            res.render("construct/search", {title: "Search result", error: "Not found"});
    }
    catch(e) {
        res.render("constrcut/error", {title: "Error!"});
    }
});

router.get("/mytabs", async (req, res) => {
    try {
        const data = await tabs.getName(req.query.name);
        if(data.length != 0) 
            res.render("construct/tabs/my", {title: "My Tabs", data: data});
        else
            res.render("construct/tabs/my", {title: "My Tabs", error: "No Tabs"});
    }
    catch(e) {
        res.render("constrcut/error", {title: "Error!"});
    }
});

router.post("/upload", async (req, res) => {
    try {
        const request = req.body;
        for(var i = 0; i < request["input"]; i++) {
            
        }
    }
    catch(e) {
        res.render("constrcut/error", {title: "Error!"});
    }
});

router.delete("/:id", async (req, res) => {

});

module.exports = router;
