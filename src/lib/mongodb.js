import dns from 'dns';

// Fix for Windows DNS resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // Ignore fallback if not permitted
}

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://neeraj:neeraj@cluster0-shard-00-00.a04kx.mongodb.net:27017,cluster0-shard-00-01.a04kx.mongodb.net:27017,cluster0-shard-00-02.a04kx.mongodb.net:27017/?ssl=true&replicaSet=atlas-9qtz3f-shard-0&authSource=admin';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
