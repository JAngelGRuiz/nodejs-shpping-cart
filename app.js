const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const { expressjwt: jwt } = require("express-jwt");
const {
  usersRoutes,
  productsRoutes,
  ordersRoutes,
  authRoutes,
} = require("./src/routes");

require("dotenv").config();

const store = MongoDbStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});
const app = express();
const upload = multer();

app.use(
  jwt({
    secret: process.env.KEY_SECRET_JWT,
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({ path: ["/auth/email"] })
);

// Middleware to parse the body response
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse the body of requests Content-Type 'multipart/form-data'
app.use(upload.single());
// Middleware to use sessions.
app.use(
  session({ secret: process.env.KEY_SECRET_JWT, resave: false, store: store })
);

// Middleware for routes.
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

// Not found routes.
app.use((req, res, next) => {
  res.status(404).send("404 NOT FOUND!");
});

connectDB().then(() => {
  app.listen(process.env.PORT || 3000);
});
