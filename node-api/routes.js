const express = require("express");
const router = express.Router();
const csvController = require("./middleware/csv_controller");
const upload = require("./middleware/upload");
const auth = require("./middleware/auth");
const { login, register } = require("./middleware/login")
const { Users, Data, blocked, interested, answered, callLater, emailMe, editing } = require("./database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

let routes = (app) => {
    router.post("/upload", auth, upload.single("file"), csvController.upload);
    router.get("/data", auth, csvController.getData);
    router.post('/login', login);
    router.post('/blocked', auth, blocked);
    router.post('/interested', auth, interested);
    router.post('/answered', auth, answered);
    router.post('/callLater', auth, callLater);
    router.post('/emailMe', auth, emailMe);
    router.post('/editing', auth, editing);
    router.post("/register", register);
    app.use("/api", router);
};

module.exports = routes;