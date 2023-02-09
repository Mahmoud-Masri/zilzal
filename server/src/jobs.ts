import fetch from "node-fetch";
import { getCollection } from "./mongo";

setInterval(updateLocation, 1100);


async function updateLocation() {
    const apiKey = '152819648043015562220x45949'

    const collection = await getCollection("requests");
    const req = await collection.findOne({located: false});

    const res = await (await fetch(`https://geocode.xyz/${req.lat},${req.lng}?geoit=JSON&auth=${apiKey}`)).json();

    req.located = true;
    req.country = res['country'];
    req.region = res['region'];
    req.city = res['city'];

    await collection.updateOne({_id: req._id}, req)
}
