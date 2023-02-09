import { HelpRequest } from "../db"
import { SERVER_URL } from "./url"

export default async function listProviders() {
    const req = await fetch(SERVER_URL + "/api/requests", {
        method: "GET",
    });

    const data = await req.json()
    return data as HelpRequest[]
}
