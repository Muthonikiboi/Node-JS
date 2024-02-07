const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  //how to connect to the local database
  //.connect(process.env.DATABASE_LOCAL,{
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"));

// We construct a schema
//new mongoose.Schema--To specify a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // where we have require we can type the line to display when we are missing this field--You pass an array
    required: [true, "A tour Must have a name"], //a validater
    //To have no tour document with the same name
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5, //If you lack to pu a rating this comes a s a default
  },
  price: {
    type: Number,
    required: [, "A tour must have a price"],
  },
});

//create model out of our schama---We create a tour out of the schema
const Tour = mongoose.model("Tour", tourSchema);

//new doc from model above
const testTour = new Tour({
  name: "The Park Camper",
  rating: 3.7,
  price: 800,
});

//testTour-Document instance,,,,,,call the save method to save document to the database
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  //returns an error if there is an error while saving
  .catch((err) => {
    console.log("Error while saving", err);
  });

const port = 3000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
