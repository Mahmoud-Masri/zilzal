import './config'
import cors from "cors"
import express from "express"
import { api } from './api'

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});

app.use('/api/', api)
