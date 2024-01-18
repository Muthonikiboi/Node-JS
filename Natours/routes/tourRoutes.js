const express = require("express");
const tourController = require("./../controllers/tourController");
//another way of writing the line of code above
//const {getAllTours,createTour,updateTour,getTour,deleteTour} = require("./../controllers/tourController");

const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
