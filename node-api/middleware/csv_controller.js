const fs = require("fs");
const csv = require("fast-csv");
const { Users, Data } = require("../database");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let numbers = [];
    let path = __basedir + req.file.filename;
    const addProperties = {
      "lastCalled": new Date(1),
      "blocked": false,
      "interested": null,
      "answered": null,
      "callDate": null,
      "emailMe": null,
      "editing": false,
      "booked": false,
      "voicemail": false
    };
    const data = fs.readFileSync(path, { encoding: "utf-8" });
    const newHeaders = "name,phone,email,email_host,website,category,address,city,region,zip,country,google_rank,facebook,instagram,twitter,linkedin,googlestars,googlereviewscount,yelpstars,yelpreviewscount,facebookstars,facebookreviewscount,facebookpixel,googlepixel,criteopixel,seo_schema,googleanalytics,linkedinanalytics,uses_wordpress,mobilefriendly,uses_shopify,domain_registration,domain_expiration,domain_registrar,domain_nameserver,instagram_name,instagram_is_verified,instagram_is_business_account,instagram_media_count,instagram_highlight_reel_count,instagram_followers,instagram_following,instagram_category,instagram_average_likes,instagram_average_comments,ads_yelp,ads_facebook,ads_instagram,ads_messenger,ads_adwords,g_maps_claimed,g_maps,search_keyword,search_city";

    // Remove existing headers if they are present
    const updatedData = data.replace(/^.*?\n/, '');

    // Prepend the new headers to the data
    fs.writeFileSync(path, newHeaders + '\n' + updatedData);

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        const wholeRow = { ...row, ...addProperties };
        numbers.push(wholeRow);
      })
      .on("end", () => {
        Data.insertMany(numbers)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into the database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = upload;
