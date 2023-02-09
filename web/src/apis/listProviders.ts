import { SERVER_URL } from "./url"

export default async function listProviders() {
    const req = await fetch(SERVER_URL + "/api/providers", {
        method: "GET",
    });

    return req.json();
}
