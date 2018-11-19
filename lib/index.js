"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongo_1 = require("./mongo");
const server = express();
const config = {
    apiKey: "",
    authDomain: "iotproject-eit.firebaseapp.com",
    databaseURL: "https://iotproject-eit.firebaseio.com",
    projectId: "iotproject-eit",
    storageBucket: "iotproject-eit.appspot.com",
    messagingSenderId: "192509429154"
};
// firebase.initializeApp(config);
// const db = firebase.database();
const collection = 'Samples';
const url = 'mongodb://admin:Iot-Eit-Siu-2018@ds139193.mlab.com:39193/iot-project';
const db = new mongo_1.MongoCollection(url, collection);
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.route('/api/data')
    .post((req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    yield db.insertElements(data);
    res.json(data);
}))
    .get((req, res) => __awaiter(this, void 0, void 0, function* () {
    const { date, coord, type, id } = req.query;
    const result = yield db.findElement(id);
    res.json(result);
}));
server.listen(process.env.PORT || 8080);
//# sourceMappingURL=index.js.map