const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
env.config();

const userRoutes = require("./routes/auth.js");

// All the middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoutes);

//mongoose connection
const MONGO_LINK = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.bdeav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(`${err} did not connect`));
app.get("/", (req, res) => {
  res.json("Started");
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT})`)
);
