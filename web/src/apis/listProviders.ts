import { HelpProvider } from "../db"
import { SERVER_URL } from "./url"

export default async function listProviders() {
    const req = await fetch(SERVER_URL + "/api/providers", {
        method: "GET",
    });

    const data = await req.json()
    return data as HelpProvider[]
}
