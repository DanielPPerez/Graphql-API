const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(authenticate);



// Ruta para el webhook
app.post('/webhook/comment', (req, res) => {
  console.log('Webhook activado:', req.body);
  res.status(200).send('Webhook recibido correctamente');
});

app.get("/", (req, res) => res.json({ msg: "Welcome. Go to /graphql" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
