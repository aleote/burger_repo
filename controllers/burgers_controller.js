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
    // Send back the ID of the new quote
    res.redirect("/index");
  });
});


// when you click on it, your changing if eaten or not 
router.put("/api/put/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgerPatty.update({
    devoured: req.body.devoured 
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






