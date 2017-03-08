var bodyParser  = require("body-parser"),
    sanitizer   = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    override    = require("method-override"),
    request     = require("request"),
    express     = require("express"),
    app         = express();



app.get("/", function(req, res){
    res.redirect("index");
});

app.get("/home", function(req, res){
    res.redirect("index");
});

app.get("/index", function(req, res){
    res.render("index"); 
});

app.get("*", function(req, res){
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SEVER IS RUNNING!!!");
});