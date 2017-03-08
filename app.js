var bodyParser  = require("body-parser"),
    sanitizer   = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    override    = require("method-override"),
    request     = require("request"),
    express     = require("express"),
    app         = express();

mongoose.connect("mongodb://localhost/restful_blog_app3");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



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