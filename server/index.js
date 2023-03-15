// server/index.js
import express from "express";

import { getRecList } from "../client/src/backend/recAlgorithm.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.get("/recommendation", async (req, res) => {
    try {
        console.log('req body ', req.body);
        const { studentID, currentLocation, terrainPreference, maxTime, intensity } = req.body;

        const recList = await getRecList(studentID, currentLocation, terrainPreference, maxTime, intensity);

        res.status(200).send({ recList });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});