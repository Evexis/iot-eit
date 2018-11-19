import { MongoClient } from "mongodb";

export class MongoCollection {
    private collection;
    constructor (private url: string, collectionName ) {
      MongoClient.connect(this.url).then((db) => {
        this.collection = db.collection(collectionName);
        console.log('Connected successfully to server');
      }).catch(err => console.error(err));
    }

    async insertElements(data) {
      const result = await this.collection.insert(data);
      console.log(`Inserted ${data.length} documents into the collection`);
      return new Promise ((resolve) => resolve(result));
    }

    async findElement(parameter?) {
      const result = await this.collection.find(parameter ? {id: parameter} : {}).toArray();
      return new Promise(resolve => resolve(result)); 
    }

}