
const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = express.Router();
const routes = require('./routes');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
