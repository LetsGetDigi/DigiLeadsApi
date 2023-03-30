

const MongoClient = require('mongodb').MongoClient;
const ObjectId= require('mongodb').ObjectId;
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
  const { _id,  blocked} = req.body;
  console.log(req.body)
  if(!(_id && typeof blocked !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const daysOld = 30
  const millis = daysOld * 24 * 60 * 60 * 1000
  const compDate = new Date((new Date().getTime() - millis))
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{blocked:blocked, lastCalled:compDate}});
  // const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{blocked:blocked}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}

const interested = async (req, res) => {
  const { _id,  interested} = req.body;
  console.log(req.body)
  if(!(_id && typeof interested !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{interested:interested}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}
const answered = async (req, res) => {
  const { _id,  answered } = req.body;
  console.log(req.body)
  if(!(_id && typeof answered !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{answered:answered}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}
const callLater = async (req, res) => {
  const { _id,  callLater} = req.body;
  console.log(req.body)
  if(!(_id && typeof callLater !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{callLater:callLater}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}
const emailMe = async (req, res) => {
  const { _id,  emailMe} = req.body;
  console.log(req.body)
  if(!(_id && typeof emailMe !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{emailMe:emailMe}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}
const editing = async (req, res) => {
  const { _id,  editing} = req.body;
  console.log(req.body)
  if(!(_id && typeof editing !== 'undefined')) {
    return res.status(401).send({ message: 'All fields are required' });
  }
  // Retrieve the user from the MongoDB database
  const update = await Data.updateOne({ _id:new ObjectId(_id)}, {$set:{editing:editing}, $currentDate:{lastModified:true, lastCalled:true}});

  if (!update) {
    return res.status(401).send({ message: 'record not found' });
  }
  res.send({"message":"updated" });
}

const getData = async (req, res) => {
  try {
  const daysOld = 15
  const millis = daysOld * 24 * 60 * 60 * 1000
  const compDate = new Date((new Date().getTime() - millis))
  
  const data =  await Data.aggregate([{$match:{lastCalled:{$lt:compDate}, blocked:false, editing:false}},{$sample:{size:1}}])
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
module.exports = {Users,Data, blocked, interested, answered, callLater, emailMe, editing, getData};