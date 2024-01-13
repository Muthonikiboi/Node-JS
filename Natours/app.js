const fs = require("fs");
const express = require("express");

const app = express();

//express.json()-is a middle ware that modifies a request that comes in
//app.use-used in order to use such a middleware
app.use(express.json());

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
const tours = JSON.parse(
  //${__dirname} --shows that it is the current directory
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", function (req, res) {
  res.status(200),
    res.json({
      status: "success",
      results: tours.length,
      data: {
        tours: tours,
      },
    });
});

//Responding to url params
app.get("/api/v1/tours/:id", function (req, res) {
  // convert string to number
  const id = req.params.id * 1;

  // invalid ID for id greater than max no of tours
  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }

  // find the tour by id
  const tour = tours.find((el) => el.id === id);

  // check if tour is undefined (not found)
  if (!tour) {
    return res.status(404).json({
      status: "Fail",
      message: "Tour not found",
    });
  }

  // Respond with the found tour
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

//API Handling POST request
app.post("/api/v1/tours/:id", function (req, res) {
  //console.log(req.body);

  //give the new object we created in the postman an ID
  const newId = tours[tours.length - 1].id + 1;
  //
  const newTour = Object.assign({ id: newId }, req.body);
  //we push this new tour to the tours array
  tours.push(newTour);

  //Write into file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    function (err) {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    }
  );
  //res.send("Done");
});

//Patch Request
app.patch("/api/v1/tours/:id", function (req, res) {
  //we can implelment the Id below when it is actually valid
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here..>",
    },
  });
});

const port = 9000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
