const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const ObjectID = require('mongodb').ObjectID;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7zutu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




const app = express();

app.use(express.json());
app.use(cors());
const port =5000;


app.get('/', (req, res) =>{
    res.send("Hello iBOS")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const iBOSCollection = client.db("iBOS").collection("data");


app.post("/addData", (req, res) => {
const data= req.body;
console.log(data);
iBOSCollection.insertOne(data)
.then(result => {
    res.send(result.insertCount);
})
})


app.get("/redData", (req, res) => {
    iBOSCollection.find()
    .toArray((err, documents)=>{
        res.send(documents);
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    iBOSCollection.findOneAndDelete({_id: ObjectID(id)})
    .then((document) => res.send(document.deleteCount > 0))
  })
 
});




app.listen(process.env.PORT || port);