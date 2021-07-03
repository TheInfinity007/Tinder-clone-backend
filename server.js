import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js'

// App Config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7kqhm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true 
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('HELLO INFINITY!!'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(PORT, () => {
    console.log(`Server listening on localhost: ${PORT}`);
});