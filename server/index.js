// server/index.js
const express = require("express");

const PORT = process.env.PORT || 3001;

const userRouter = require('./routes/user');

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

