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
// .then((con) => {
//   //con is the result value of the promise
//   console.log(con.connections);
//   console.log("DB CONNECTION SUCCESSFUL");
// });

const port = 3000;
//callback function to output "" when the server starts running
app.listen(port, function () {
  console.log(`App is listening on port ${port}...`);
});
