const express = require("express");

const app = express();
const cors = require('cors');

require("./configs/dotenv");
const client = require("./configs/database");
const user = require("./routes/user");
const product = require("./routes/product");

app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/product", product);

client.connect(async (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to DB");
    }
});
const port = 8080;

app.get("/", (req, res) => {
    res.status(200).send(`neuKart API`);
})

app.listen(port, () => {
    console.log(`api started at ${port}.`);
})