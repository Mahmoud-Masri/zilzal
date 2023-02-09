import { Router } from "express";
import { getCollection } from "./mongo";
export const api = Router();

api.post("/request-help", async (req, res) => {
    const collection = await getCollection("requests");
    const data = req.body;
    await collection.insertOne(data);
    res.send(data);
});


api.post("/provide-help", async (req, res) => {
    const collection = await getCollection("providers");
    const data = req.body;
    await collection.insertOne(data);
    res.send(data);
})

api.get("/requests", async (req, res) => {
    const collection = await getCollection("requests");
    const requests = await collection.find().toArray();
    res.send(requests);
})

api.get("/providers", async (req, res) => {
    const collection = await getCollection("providers");
    const providers = await collection.find().toArray();
    res.send(providers);
})
