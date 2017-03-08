var bodyParser  = require("body-parser"),
    sanitizer   = require("express-sanitizer"),
    mongoose    = require("mongoose"),
    override    = require("method-override"),
    request     = require("request"),
    express     = require("express"),
    app         = express();
    
app.get("/", function(req, res){
    res.show("<h1>Slash page!</h1>");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SEVER IS RUNNING!!!");
});