const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:LetsGetDigi123@159.69.180.8:27017';
const dbName = 'test';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function (err) {
  if (err) {
    console.error('Failed to connect to MongoDB database', err);
    return;
  }
  console.log('Connected successfully to MongoDB database');
});

const db = client.db(dbName);
const Users = db.collection('Users');
const Data = db.collection('Data');


const blocked = async (req, res) => {
  const { _id, blocked } = req.body;
  console.log(req.body)
  if (!(_id && blocked)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { blocked: blocked, "lastModified": $$NOW });

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const interested = async (req, res) => {
  const { _id, interested } = req.body;
  console.log(req.body)
  if (!(_id && interested)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { interested: interested, "lastModified": $$NOW });

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const answered = async (req, res) => {
  const { _id, answered } = req.body;
  console.log(req.body)
  if (!(_id && answered)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { answered: answered, "lastModified": $$NOW });

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const callLater = async (req, res) => {
  const { _id, callLater } = req.body;
  console.log(req.body)
  if (!(_id && callLater)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { callLater: callLater, "lastModified": $$NOW });

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
const emailMe = async (req, res) => {
  const { _id, emailMe } = req.body;
  console.log(req.body)
  if (!(_id && emailMe)) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { emailMe: emailMe, "lastModified": $$NOW });

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
  const update = await Data.updateOne({ _id: new ObjectId(_id) }, { blocked: field, "lastModified": $$NOW });

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({ "message": "updated" });
}
module.exports = { Users, Data, blocked, interested, answered, callLater, emailMe, editing };