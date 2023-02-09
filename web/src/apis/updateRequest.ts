import { RequestStatus } from "../db";
import { SERVER_URL } from "./url";

export default async function updateRequest(requestId: string, status: RequestStatus) {
    const req = await fetch(SERVER_URL + "/api/request-help", {
        method: "POST",
        body: JSON.stringify({ requestId, status }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return req.json();
}
