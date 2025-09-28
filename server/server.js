const express = require("express");
const models = require("./models/index.js");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./services/auth.js");
const MongoStore = require("connect-mongo");
const schema = require("./schema/schema.js");
const cors = require("cors");

// Create a new Express application
const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI = "mongodb://root:pw@localhost:27017/auth?authSource=admin";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "aaabbbccc",
    store: new MongoStore({
      mongoUrl: MONGO_URI,
    }),
  })
);

// Add body parser with increased limit for images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// // dealing with cors headers
// const allowedOrigins = ["http://localhost:5000", "http://127.0.0.1:5000"];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.

app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: req, // Pass the request object directly as context
  }))
);

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
});

module.exports = app;
