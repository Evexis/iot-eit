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
const mongodb_1 = require("mongodb");
class MongoCollection {
    constructor(url, collectionName) {
        this.url = url;
        mongodb_1.MongoClient.connect(this.url).then((db) => {
            this.collection = db.collection(collectionName);
            console.log('Connected successfully to server');
        }).catch(err => console.error(err));
    }
    insertElements(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insert(data);
            console.log(`Inserted ${data.length} documents into the collection`);
            return new Promise((resolve) => resolve(result));
        });
    }
    findElement(parameter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.find(parameter ? parameter : {}).toArray();
            return new Promise(resolve => resolve(result));
        });
    }
}
exports.MongoCollection = MongoCollection;
//# sourceMappingURL=mongo.js.map