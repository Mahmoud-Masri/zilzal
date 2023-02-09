import "./config";
import cors from "cors";
import express from "express";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import { api } from "./api";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", api);

if (process.env.ENABLE_SSL === "true") {
    const privateKey = fs.readFileSync("/etc/letsencrypt/live/server.help23.net/privkey.pem", "utf8");
    const certificate = fs.readFileSync("/etc/letsencrypt/live/server.help23.net/cert.pem", "utf8");
    const ca = fs.readFileSync("/etc/letsencrypt/live/server.help23.net/chain.pem", "utf8");
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
    };

    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    httpServer.listen(80, () => {
        console.log("HTTP Server running on port 80");
    });

    httpsServer.listen(443, () => {
        console.log("HTTPS Server running on port 443");
    });
} else {
    app.listen(3001, () => {
        console.log("Server is running on port 3000");
    });
}
