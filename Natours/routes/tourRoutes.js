const express = require("express");
const tourController = require("./../controllers/tourController");
//another way of writing the line of code above
//const {getAllTours,createTour,updateTour,getTour,deleteTour} = require("./../controllers/tourController");

const router = express.Router();

//PARAM MIDDLEWARE-runs only for a certain parameter
//The parameter it wants to run for is id
//since it a middleware has next function
//val-value of the parameter in question
router.param("id", tourController.checkId);

//Create checkbody middleware function
//check if body contains the name and price property
//if not,send back 400(bad request)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
