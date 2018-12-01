import * as express from "express";
import { samples } from "./mock/mock-data";
import * as bodyParser from 'body-parser';
import { MongoCollection } from './mongo';

const server = express();

const url = 'mongodb://admin:Iot-Eit-Siu-2018@ds139193.mlab.com:39193/iot-project';
const db ={
    samples: new MongoCollection(url, 'Samples'),
    devices: new MongoCollection(url, 'Devices')
} 

server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.route('/api/data')
    .post(async (req: express.Request, res: express.Response) => {
        const device = await db.devices.findElement(`{"deviceId": "${req.headers.id}"}`)
        console.log(device)
        if(device[0]) {
            const data = req.body
            await db.samples.insertElements(data)
            res.json(data);
        }
        else{
            res.status(403).send("Forbidden");
        }
    })
    .get(async (req: express.Request, res: express.Response) => {
        const {date, coord, type, id} = req.query;
        const result = await db.samples.findElement(id);
        res.json(result)
    });

server.listen(process.env.PORT || 8080)
