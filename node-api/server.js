const express = require("express");
const app = express();
const initRoutes = require("./routes");
const bodyParser = require('body-parser');
const cors = require('cors')
global.__basedir = __dirname + "/uploads/";
console.log(__dirname + "\\uploads")
app.use(bodyParser.json());
app.use(cors())
// app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});