const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();

//1...MIDDLEWARES

app.use(morgan("dev"));
//express.json()-is a middle ware that modifies a request that comes in
//app.use-used in order to use such a middleware
app.use(express.json());

//We are defining a middleware(globally)
app.use(function (req, res, next) {
  console.log("Hello from the middleware");
  //we call the next function it will be recurring
  next();
});

//middle ware to manipulate the request object
//Get the time the request happened
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

//2...ROUTE HANDLERS
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

const getAllTours = function (req, res) {
  console.log(req.requestTime);
  res.status(200),
    res.json({
      status: "success",
      requestAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
};

const getTour = function (req, res) {
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
};

const createTour = function (req, res) {
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
};

const updateTour = function (req, res) {
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
};

const deleteTour = function (req, res) {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

//app.get("/api/v1/tours", getAllTours);
//Responding to url params
//app.get("/api/v1/tours/:id", getTour);
//API Handling POST request
//app.post("/api/v1/tours/:id", createTour);
//Patch Request
//app.patch("/api/v1/tours/:id", updateTour);
//Delete Request
//app.delete("/api/v1/tours/:id", deleteTour);

//3...ROUTES
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//4...SERVER
const port = 3000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
