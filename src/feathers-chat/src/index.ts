import mongoose from "mongoose";
import app from "./app";
import logger from "./logger";

const port = app.get("port");
const server = app.listen(port);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: parseInt(process.env.POOL_SIZE!),
};
mongoose
  .connect(process.env.MONGO_URI!, options)
  .then((res) => {
    console.log("Connected to Distribution API Database - Initial Connection");
  })
  .catch((err) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });

server.on("listening", async () => {
  logger.info("Hello sir. API up and running");
});

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  )
);
