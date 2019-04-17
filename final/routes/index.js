const signin = require("./signIn");
const signup = require("./signUp");
const tabs = require("./tabs");
const head = require("./head");
const logout = require("./logout");

const constructorMethod = app =>{
    app.get("/", (req, res) => {
        res.render('construct/index', {title: "Guitar Tabs", status: head(req)});
    });
    app.use("/signin", signin);
    app.use("/signup", signup);
    app.use("/tabs", tabs);
    app.use("/logout", logout);

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;