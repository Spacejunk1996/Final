const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const configRoutes =require("./routes");
const exphbs = require('express-handlebars');
const cookie = require('cookie-parser');

app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(__dirname + "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookie('JqZhang'));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.listen(3000, () => {
    console.log("The Server Has Been Connected! Port Is 3000");
});
