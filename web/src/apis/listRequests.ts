import { SERVER_URL } from "./url"

export default async function listRequests() {
    const req = await fetch(SERVER_URL + "/api/requests", {
        method: "GET",
    });

    return req.json();
}
