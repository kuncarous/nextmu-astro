import { MongoClient } from 'mongodb';
import { environment } from '~/consts/environment';

let client: MongoClient | null = null;
export const getMongoClient = async () => {
    if (client != null) return client;
    client = await MongoClient.connect(environment.mongoDb.uri);
    return client;
};
