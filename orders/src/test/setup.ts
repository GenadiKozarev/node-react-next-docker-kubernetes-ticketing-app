import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

// Whenever there's an attempt to import the real nats-wrapper, we will actually import the mock version of it in all tests.
jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'blabla';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
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

global.signin = () => {
    // Build JWT payload { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'bark@bark.com',
    };
    // Create the JWT
    // The exclamation mark tells TypeScript that we're sure the key exist
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // Build session object { jwt: MY_JWT }
    const session = { jwt: token };
    // Turn that session into JSON string
    const sessionJSON = JSON.stringify(session);
    // Taken JSON and encode it as base46
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // supertest requires it to be inside an array
    return [`session=${base64}`];
};