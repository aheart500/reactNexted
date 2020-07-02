const next = require("next");
const { createServer } = require("http");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const express = require("express");
var app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const adminRouter = require("./controllers/AdminRouter");
const userRouter = require("./controllers/UserRouter");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successed");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use("/images/", express.static("../public/images")); */
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.all("*", (req, res) => {
  return handle(req, res);
});

nextApp.prepare().then(() => {
  const server = createServer(app);
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is listening on port: " + PORT);
  });
});
