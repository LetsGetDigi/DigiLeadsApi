const express = require("express");
const router = express.Router();
const upload = require("./middleware/csv_controller");
const uploadHandler = require("./middleware/upload");
const auth = require("./middleware/auth");
const {login, register} = require("./middleware/login")
const {Users, Data, blocked, interested, answered, callLater, emailMe, editing, booked, voicemail, analytics,remove, getData, contacts} = require("./database");


let routes = (app) => {
    router.post("/upload", auth, uploadHandler.single("file"), upload);
    router.get("/data", auth, getData);
    router.post('/login', login);
    router.post('/blocked', auth, blocked);
    router.post('/interested', auth, interested);
    router.post('/answered', auth, answered);
    router.post('/callLater', auth, callLater);
    router.post('/emailMe', auth, emailMe);
    router.post('/editing', auth, editing);
    router.post("/booked", auth, booked);
    router.post("/voicemail", auth, voicemail);
    router.get("/contacts", auth, contacts);
    router.post("/delete", auth, remove);
    router.get("/analytics", auth, analytics);
    
    router.post("/register", register);
    app.use("/api", router);
};

module.exports = routes;