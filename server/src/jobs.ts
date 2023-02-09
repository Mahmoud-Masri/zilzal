import fetch from "node-fetch";
import { getCollection } from "./mongo";

setInterval(updateLocation, 1100);

async function updateLocation() {
    const apiKey = "152819648043015562220x45949";

    const collection = await getCollection("requests");
    const req = await collection.findOne({ located: false, lat: { $exists: true }, lng: { $exists: true } });
    if (!req) {
        return;
    }

    try {
        const res = await (await fetch(`https://geocode.xyz/${req.lat},${req.lng}?geoit=JSON&auth=${apiKey}`)).json();

        await collection.updateOne(
            { _id: req._id },
            {
                $set: {
                    located: true,
                    country: res["country"],
                    region: res["region"],
                    city: res["city"],
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
}
