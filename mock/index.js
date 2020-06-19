const API = require('../api.js');
const cities = require('./cities.json');
const masks = require('./masks.json');

const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

const cors = require('./utils/cors');
app.use('/*', cors);

app.get(API.city.url, async (req, res) => {
    await sleep(0);
    res.status(200);
    res.json(cities);
});
app.get(API.mask.url, async (req, res) => {
    await sleep(0);
    res.status(200);
    res.json(masks);
});

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`));
