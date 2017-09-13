var express = require("express");
var router = express.Router();


router.get("/untappd", function (req, res) {

  var untappd = {
    client_id : process.env.CLIENT_ID,
    secret_id : process.env.CLIENT_SECRET
  }
  
  res.json(untappd);

})

module.exports = router;