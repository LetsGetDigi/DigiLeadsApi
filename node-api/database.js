const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://digiLeads:XZoZyFJMqvRaFTYt@cluster0.jfqurv9.mongodb.net/';
const dbName = 'leadManagment';
const client = new MongoClient(url, { useNewUrlParser: true });
var ObjectId = require('mongodb').ObjectId;
client.connect(function (err) {
  if (err) {
    console.error('Failed to connect to MongoDB database', err);
    return;
  }
  console.log('Connected successfully to MongoDB database');
});

const db = client.db(dbName);
const Users = db.collection('leadsContactList');
const Data = db.collection('leadsPool');
const Analytics = db.collection('leadsAnalytics')

const blocked = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && blocked)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { blocked: field }, $currentDate: { lastModified: true, lastCalled: true } });
  const increment = await Analytics.updateOne({}, { $inc: { blocked: 1 } });


  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const interested = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && typeof field !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { interested: field }, $currentDate: { lastModified: true, lastCalled: true } });
  if (field) {
    await Analytics.updateOne({}, { $inc: { interested: 1 } });
  } else {
    await Analytics.updateOne({}, { $inc: { notInterested: 1 } });
  }


  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const answered = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && typeof field !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { answered: field }, $currentDate: { lastModified: true, lastCalled: true } });
  if (field) {
    await Analytics.updateOne({}, { $inc: { answered: 1 } });
  } else {
    await Analytics.updateOne({}, { $inc: { noAnswer: 1 } });
  }


  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const callLater = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && callLater)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  try {
    const date = new Date(field);
    const isoDate = date.toISOString();
    // Retrieve the user from the MongoDB database
    const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { callLater: true, callDate: field }, $currentDate: { lastModified: true, lastCalled: true } });
    const increment = await Analytics.updateOne({}, { $inc: { callLater: 1 } });


    if (!update) {
      return res.status(401).send({ message: 'record not found' });
    }
  } catch {
    return res.status(401).send({ message: 'date field is not correct' });
  }
  res.send({ "message": "updated" });
}
const email = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && field)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { email: field, emailMe: true }, $currentDate: { lastModified: true, lastCalled: true } });
  const increment = await Analytics.updateOne({}, { $inc: { emailMe: 1 } });


  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const editing = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && field)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { editing: field }, $currentDate: { lastModified: true, lastCalled: true } });
  const increment = await Analytics.updateOne({}, { $inc: { editing: 1 } });


  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const booked = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && field)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  try {
    // Retrieve the user from the MongoDB database
    const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { booked: field }, $currentDate: { lastModified: true, lastCalled: true } });
    const increment = await Analytics.updateOne({}, { $inc: { booked: 1 } });

    if (!update) {
      return res.status(401).send({ message: 'record not found' });
    }
  } catch {
    return res.status(401).send({ message: 'date field is not correct' });
  }
  res.send({ "message": "updated" });
}

const voicemail = async (req, res) => {
  const { _id, field } = req.body;
  console.log(req.body)
  if (!(_id && field)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  try {
    const date = new Date(field);

    // Retrieve the user from the MongoDB database
    const update = await Data.updateOne({ _id: new ObjectId(_id) }, { $set: { voicemail: field }, $currentDate: { lastModified: true, lastCalled: true } });
    const increment = await Analytics.updateOne({}, { $inc: { voicemail: 1 } });
    if (!update) {
      return res.status(401).send({ message: 'record not found' });
    }
  } catch {
    return res.status(401).send({ message: 'date field is not correct' });
  }
  res.send({ "message": "updated" });
}
const remove = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body)
  if (!(_id)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  try {

    // Retrieve the user from the MongoDB database
    const update = await Data.deleteOne({ _id: new ObjectId(_id) });

    if (!update) {
      return res.status(401).send({ message: 'record not found' });
    }
  } catch {
    return res.status(401).send({ message: 'date field is not correct' });
  }
  res.send({ "message": "updated" });
}
const analytics = async (req, res) => {
  try {
    const data = await Analytics.findOne({})
    res.send(data);
  } catch (error) {

    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving data.",
    });
  }
};

const contacts = async (req, res) => {
  try {
    const docs = await Data.find({
      $or: [
        { booked: true },
        { emailMe: true },
        { callLater: true }
      ]
    }).toArray();

    res.json(docs);
  } catch (err) {
    console.log('Error running query:', err);
    res.status(500).send('Error running query');
  }
};

const getData = async (req, res) => {
  try {
    const daysOld = 15
    const millis = daysOld * 24 * 60 * 60 * 1000
    const compDate = new Date((new Date().getTime() - millis))

    const data = await Data.aggregate([{ $match: { lastCalled: { $lt: compDate }, blocked: false, editing: false } }, { $sample: { size: 1 } }])
    for await (const doc of data) {
      console.log(doc);
      res.send(doc);
    }
  } catch (error) {

    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
module.exports = { Users, Data, blocked, interested, answered, callLater, email, editing, booked, voicemail, analytics, remove, contacts, getData };
