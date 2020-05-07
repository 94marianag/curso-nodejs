const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const routesV1 = require('./routes/v1');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB error', error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
