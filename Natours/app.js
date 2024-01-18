const express = require("express");
const morgan = require("morgan");
const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

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

//USERS

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
app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

//4...SERVER
module.exports = app;
