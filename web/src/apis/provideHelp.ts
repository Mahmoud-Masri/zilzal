import { HelpProvider } from "../db"
import { SERVER_URL } from "./url"

export default async function provideHelp(data: HelpProvider) {
    const req = await fetch(SERVER_URL + "/api/provide-help", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return req.json();
}
