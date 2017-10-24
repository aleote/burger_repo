var express = require("express");
var burgerPatty = require("../models/burger.js");

var router = express.Router();


//this is going back to the index every time we submit
router.get("/", function(req, res){
	res.redirect("/index");
});

router.get("/index", function(req, res) {
  burgerPatty.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  burgerPatty.create([
    "burger_name","devoured"
  ], [
    req.body.name, false // setting devoured to false, because it is not devoured yet 
  ], function(result) {

  	console.log("burger recieved");
    // Send back the ID of the new quote
    res.redirect("/index");
  });
});



// when you click on it, your changing if eaten or not 
router.put("/burgers/create", function(req, res) {
  console.log("this is my log");
  var condition = "id = " + req.body.id;

  // console.log("condition", condition);

console.log("\n\n", req.body.id);

  burgerPatty.update({
    devoured: req.body.id
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;






