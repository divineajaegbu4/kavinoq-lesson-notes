import express from "express";
import router from "./routes/posts.mjs";

const app = express();

app.use(express.json());

const timeStamp = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log([req.requestTime]);
  next();
};

app.use(timeStamp);

app.use("/posts", router);

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    statusCode: err.status || 500,
  });

});

app.listen(3000, () => {
  console.log("Loading http://localhost:3000");
});
