const express = require("express");

const app = express();

//get method
app.get("/", function (req, res) {
  //next lines speifies the status code-use 200 for okay
  //res.status(200), res.send("send request to homepage");
  res.status(200),
    res.json({
      message: "send information to homepage",
      app: "Natours",
    });
});

//post method
app.post("/", function (req, res) {
  res.send("you can post to the endpoint...");
});

const port = 3000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
