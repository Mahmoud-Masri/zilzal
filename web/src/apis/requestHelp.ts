import { HelpRequest } from "../db"
import { SERVER_URL } from "./url"

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

export async function UpdateRequest(id: string, data: Partial<HelpRequest>) {
    const req = await fetch(SERVER_URL + "/api/requests/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return req.json();
}
