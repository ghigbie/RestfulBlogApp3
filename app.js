var expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    request          = require("request"),
    express          = require("express"),
    app              = express();

mongoose.connect("mongodb://localhost/restful_blog_app3");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //this is required to go after body-parser
app.use(methodOverride("_method"));

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
    res.redirect("/blogs"); //this redirects to /blogs
});

app.get("/home", function(req, res){
    res.redirect("/blogs"); //this redirects to /blogs
});

app.get("/index", function(req, res){
    res.redirect("/blogs"); //this redirects to /blogs
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

//NEW ROUTE
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("THERE WAS AN ERROR IN THE CREATE ROUTE");
            console.log(err);
            res.render("new");
        }else{
             //then redirect
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    //find the blog
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("ERROR IN FIND BY ID IN THE SHOW ROUTE");
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog})
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log("THERE WAS IN ERROR INT THE EDIT ROUTE");
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE - this comes from the edit.ejs page
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);    //Blog.findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           console.log("THERE WAS AN ERROR IN UPDATE ROUUTE");
           console.log(err);
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/" + req.params.id);
       }
    });
    
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //Destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log("THERE WAS AN ERROR IN THE DESTROY ROUTE");
           console.log(err);
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs");
       }
   });
});


app.get("*", function(req, res){
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!!!");
});