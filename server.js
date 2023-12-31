const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const { postsRouter } = require("./routers/postsRouter");

const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/posts", postsRouter);

app.listen(PORT, (err) => {
   if (err) console.error(`Error at a server: ${err}!`);
   console.log(`Server running on ${PORT} port!`);
});
