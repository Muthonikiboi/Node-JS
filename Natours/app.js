const fs = require("fs");
const express = require("express");

const app = express();

// //get method
// app.get("/", function (req, res) {
//   //next lines speifies the status code-use 200 for okay
//   //res.status(200), res.send("send request to homepage");
//   res.status(200),
//     res.json({
//       message: "send information to homepage",
//       app: "Natours",
//     });
// });

// //post method
// app.post("/", function (req, res) {
//   res.send("you can post to the endpoint...");
// });

//API Handling GET
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) //${__dirname} --shows that it is the current directory
);

app.get("/api/v1/tours", function (req, res) {
  res.status(200),
    res.json({
      status: "success",
      results: tour.length,
      data: {
        tours: tour,
      },
    });
});

const port = 3000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
