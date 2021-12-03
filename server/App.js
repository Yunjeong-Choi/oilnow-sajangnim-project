const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3303;
const data = require("./database.json");

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running... ${PORT}`);
});

app.get("/data", (req, res) => {
  res.send(data);
  console.log(`GET! ${req.path}`);
});
