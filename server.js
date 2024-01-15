const express = require('express');
const app = express();
const endPoints = require('./src/routes/routes');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(cors());
const port = 3002;
app.use(bodyParser.json());

app.use('/thaprobane/files/v01', endPoints);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
