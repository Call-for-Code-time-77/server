const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

// DB Config
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => {
  console.error("Error: " + error.message);
});

// Load Models
require("./models/User");
require("./models/Post");
require("./models/Watson");

const app = require("./app");

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
  const { port } = server.address();
  console.log("Sever running on port " + port);
});
