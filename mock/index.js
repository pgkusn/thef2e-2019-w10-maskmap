const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // 接收 json 資料
app.use(express.urlencoded({ extended: false })); // 接收 form urlencoded 的資料

const cors = require('./utils/cors');
app.use('/*', cors);

app.get('/', (req, res) => res.send('Hello World~'));

app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`));
