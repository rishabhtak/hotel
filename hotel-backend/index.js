const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const path = require("path");

connectToMongo();

const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/", express.static(__dirname));
// app.use(express.static(path.resolve(__dirname, "build")));
app.use(
  "/static/images/",
  express.static(path.resolve(__dirname + "/public/images/rooms/"))
);

//available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/room", require("./routes/room"));
app.use("/api/roomdetail", require("./routes/roomdetail"));

// app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
app.get("/", (req, res) => res.send("Express on Vercel"));


app.listen(port, () => {
  console.log(`Hotel-backend app listening on port http://localhost:${port}`);
});
