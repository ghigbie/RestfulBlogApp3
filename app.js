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

//mongoose model config (title, image, body, created)
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});
//mongoose schema compiled into model
var Blog = mongoose.model("Blog", blogSchema);

//RESTful ROUTES

app.get("/", function(req, res){ 
    res.redirect("index"); //this redirects to /blogs
});

app.get("/home", function(req, res){
    res.redirect("index"); //this redirects to /blogs
});

app.get("/index", function(req, res){
    res.render("index"); //this redirects to /blogs
});
//CREATE ROUTE    //this is the meat of the CREATE ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR ON CREATE ROUTE");
            console.log(err);
        }else{
            res.render("index", {blogs: blogs})//the second parameter is data that is used onthe page
        }
    });

});

app.get("*", function(req, res){
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!!!");
});