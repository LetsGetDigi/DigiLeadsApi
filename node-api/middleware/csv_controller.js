const fs = require("fs");
const csv = require("fast-csv");
const {Users, Data} = require("../database");

const upload = async (req, res) => {
  try {

    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let numbers = [];
    let path = __basedir + req.file.filename;
    const addProperties = {"lastCalled":new Date(1), "blocked":false, "interested":null, "answered":null, "callDate":null, "emailMe":null, "editing":false, "booked":false, "voicemail":false, "email":""}
    const data = fs.readFileSync(path, {encoding:"utf-8"})
    const headers = "website,number\n"
    fs.writeFileSync(path, headers+data);
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        const wholeRow = {...row, ...addProperties}
        numbers.push(wholeRow);
      })
      .on("end", () => {
        Data.insertMany(numbers)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
        // fs.rm(path);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = upload;