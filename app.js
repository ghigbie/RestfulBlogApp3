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

Blog.create({
   title: "Test Blog",
   image: "https://unsplash.com/collections/151173/pets?photo=OcWwYCVIOOU",
   body: "TESTING, TESTING....ONE, TWO, THREE....."
});

//RESTful ROUTES
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
    console.log("SERVER IS RUNNING!!!");
});