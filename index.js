require('dotenv').config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xdpsuxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {

    try {
        const studentCollection = client.db('resoluteSchool').collection('students')

        app.post('/students', async (req, res) => {
            const item = req.body
            console.log(item)
            const result = await studentCollection.insertOne(item)
            res.send(result)
        })
// hello
        app.get('/students', async (req, res) => {
            const query = {}
            const result = await studentCollection.find(query).toArray()
            res.send(result)
        })

        app.delete('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await studentCollection.deleteOne(query);
            res.send(result)
        })

        app.get('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(query)
            const result = await studentCollection.find(query).toArray();
            res.send(result);

        })
        app.get('/studentsEdit/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(query)
            const result = await studentCollection.find(query).toArray();
            res.send(result);

        })
        app.put('/studentsEdit/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const user = req.body;
            console.log(user)
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    class: user.class,
                    roll: user.roll,
                    division: user.division,
                    city: user.city,
                    address1: user.address1,
                    address2: user.address2,
                    landmark: user.landmark,
                    pincode: user.pincode
                }
            }
            const result = await studentCollection.updateOne(filter, updatedUser, option);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))
app.get('/', (req, res) => {
    res.send('post is running on school')
})

app.listen(port, () => {
    console.log(`my post is running on ${port}`)
}) 
// 