import * as functions from 'firebase-functions';
import * as express from "express";
import * as firebase from "firebase";
import { samples } from "./mock/mock-data";
import * as bodyParser from 'body-parser';
import { MongoCollection } from './mongo';

const server = express();

const config = {
    apiKey: "",
    authDomain: "iotproject-eit.firebaseapp.com",
    databaseURL: "https://iotproject-eit.firebaseio.com",
    projectId: "iotproject-eit",
    storageBucket: "iotproject-eit.appspot.com",
    messagingSenderId: "192509429154"
}
firebase.initializeApp(config);

const db = firebase.database();

// const collection = 'Samples';
// const url = 'mongodb://admin:Iot-Eit-Siu-2018@ds139193.mlab.com:39193/iot-project';
// const db = new MongoCollection(url, collection);

server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.route('/api/data')
    .post((req: express.Request, res: express.Response) => {
        const data = req.body
        // add data to database

        res.json(data);
    })
    .get((req: express.Request, res: express.Response) => {
        const {date, coord, type} = req.query;
        // db.insertElements({date, coord, type})
        res.json({ date, coord, type })
    });



export const app = functions.https.onRequest(server);
