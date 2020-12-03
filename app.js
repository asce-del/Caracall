const express = require("express");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

const TWO_HOURS = 1000 * 60 * 60 * 2

app.use(
  session({
    name: process.env.SESS_NAME,
    userId: null,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

const connect = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", require("./routes/authentication.routes"));
app.use("/api/friends", require("./routes/friends.routes"));
app.use("/api/session", require("./routes/session.routes"))

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
