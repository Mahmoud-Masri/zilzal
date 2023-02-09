import { Router } from "express"
import { getCollection } from "./mongo"

export const api = Router();

api.post("/request-help", async (req, res) => {
    try {
        const collection = await getCollection("requests");
        const data = req.body;
        data["status"] = "New";
        await collection.insertOne(data);
        res.send({ ok: true });
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});

api.post("/provide-help", async (req, res) => {
    try {
        const collection = await getCollection("providers");
        const data = req.body;
        console.log("data", data);
        await collection.insertOne(data);
        console.log("data", data);
        res.send({ ok: true });
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});

api.get("/requests", async (req, res) => {
    try {
        const collection = await getCollection("requests");
        const requests = await collection.find({}).toArray();
        res.send(requests);
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});

api.get("/providers", async (req, res) => {
    try {
        const collection = await getCollection("providers");
        const providers = await collection.find().toArray();
        res.send(providers);
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});

api.put("/requests/:requestId", async (req, res) => {
    try {
        const collection = await getCollection("requests");
        await collection.updateOne({ _id: req.params.requestId }, { $set: req.body });
        const request = await collection.findOne({ _id: req.params.requestId });
        res.send(request);
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});

api.put("/providers/:providerId", async (req, res) => {
    try {
        const collection = await getCollection("providers");
        await collection.updateOne({ _id: req.params.providerId }, { $set: req.body });
        const provider = await collection.findOne({ _id: req.params.providerId });
        res.send(provider);
    } catch (e) {
        console.log(e);
        res.send({ ok: false });
    }
});
