import {MongoClient} from 'mongodb';

const url = process.env.MONGO_URL!
const dbName = process.env.MONGO_DB_NAME!

if (!url) {
    throw new Error('MONGO_URL environment variable is not set')
}
if (!dbName) {
    throw new Error('MONGO_DB_NAME environment variable is not set')
}
const client = new MongoClient(url)

let connection: Promise<MongoClient>
export async function connect() {
    if (connection) return connection
    connection = client.connect()
    return connection
}
connect()


export async function getCollection(collectionName: string) {
    await connection
    const db = client.db(dbName)
    return db.collection(collectionName)
}
