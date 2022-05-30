
require('dotenv/config')
const express = require('express')
const mongo = require('mongodb').MongoClient
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const url = process.env.MONGO_URl



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let menudb, customersdb

mongo.connect(url, options, (err, mongoClient) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('we are connected!')

    app.listen(3000, () => console.log('app is listening on port 3000'))

 const db = mongoClient.db('restaurant')
 const customersdb = db.collection('customers')   
 menudb = db.collection('menu')
})

app.get('/', (req, res) => res.status(200).send('Connecting to AWS!'))

app.post('/', (req, res) => {
    menudb.insertOne(req.body)
    res.status(201).send('item was added')
})

// patch
app.patch('/', (req, res) => {
    menudb.updateOne({name: 'leche de tigre' }, { $set: { name: 'tequila', cost: 30, stock: true } })
    .then(() => res.status(200).send('item was updated'))
})

// delete
app.delete('/', (req, res)=> {
    menudb.deleteOne({name: req.body.name }).then(() => res.send('item was deleted'))
})
