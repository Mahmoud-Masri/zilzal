import fetch from "node-fetch";
import { getCollection } from "./mongo";

async function updateLocation() {
    const apiKey = "152819648043015562220x45949";

    let collection = await getCollection("requests");

    let obj = await collection.findOne({
        located: { $exists: false },
        lat: { $exists: true },
        lng: { $exists: true },
    });

    if(!obj){
        collection = await getCollection("providers");
        obj = await collection.findOne({
            located: { $exists: false },
            lat: { $exists: true },
            lng: { $exists: true },
        });
    }

    if (!obj) {
        setTimeout(updateLocation, 1100);
        return;
    }

    try {
        const res = await (await fetch(`https://geocode.xyz/${obj.lat},${obj.lng}?geoit=JSON&auth=${apiKey}`)).json();

        await collection.updateOne(
            { _id: obj._id },
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
    } finally {
        setTimeout(updateLocation, 1100);
    }
}

updateLocation()
