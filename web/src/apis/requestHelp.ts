import { HelpRequest } from "../db";
import { SERVER_URL } from "./url";

export default async function requestHelp(data: HelpRequest) {
    const req = await fetch(SERVER_URL + "/api/request-help", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return req.json();
}
