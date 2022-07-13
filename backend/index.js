const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 3000;

// Available Routes
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

// app.get("/", (req, res) => {
//   res.send("Hello Nadia!");
// });
// app.get("/api/v1/login", (req, res) => {
//   res.send("Hello login!");
// });
// app.get("/api/v1/signup", (req, res) => {
//   res.send("Hello signup!");
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});