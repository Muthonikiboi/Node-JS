const fs = require("fs");

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
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//add a middleware to check Id
exports.checkId = function (req, res, next, val) {
  console.log(`tour id is:${val}`);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = function (req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Bad request",
    });
    next();
  }
};

exports.getAllTours = function (req, res) {
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

exports.getTour = function (req, res) {
  // // convert string to number
  // const id = req.params.id * 1;

  // // invalid ID for id greater than max no of tours
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: "Fail",
  //     message: "Invalid ID",
  //   });
  // }

  const id = req.params.id * 1;

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

exports.createTour = function (req, res) {
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

exports.updateTour = function (req, res) {
  // //we can implelment the Id below when it is actually valid
  // const id = req.params.id * 1;

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: "Fail",
  //     message: "Invalid ID",
  //   });
  // }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here..>",
    },
  });
};

exports.deleteTour = function (req, res) {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
