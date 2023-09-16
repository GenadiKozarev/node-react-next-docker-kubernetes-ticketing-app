import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { connect } from 'mongoose';
import { app } from '../app';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'blabla';
    
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    // Get all existing collections
    const collections = await mongoose.connection.db.collections();

    // Loop over them and delete all data inside
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});