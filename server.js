const express = require("express");
const graphqlHTTP = require("express-graphql");
const path = require("path");
// import cors
const cors = require("cors");
const schema = require("./schema");
// with graphql and express we only have one endpoint and that is going to
// be  "/graphql" , and from there we create a Schema
// the schema file will include all the queries that we want any mutation

const app = express();

// Allow cross-origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// set a static folder
app.use(express.static("public")); // we are saying that we want the 'public' to be our static folder

// whenever any route except 'graphql' is hit >>> it just going to redirect to index.html page in the 'public' folder
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname), "public", index.html);
});

// we create a variable and we set it to the environment variable
// so that when we deploy to Heroku it will read that or || 5000
// or port 5000 in development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
