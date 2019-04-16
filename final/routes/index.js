const signin = require("./signIn");
const signup = require("./signUp");
const tabs = require("./tabs");

const constructorMethod = app =>{
    app.get("/", (req, res) => {
        res.render('construct/index', {title: "Guitar Tabs"});
    });
    app.use("/signin", signin);
    app.use("/signup", signup);
    app.use("/tabs", tabs);

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;