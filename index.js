import cors from 'cors';
import nocache from 'nocache';
import express from 'express';
import bodyParser from 'body-parser';
import Main from './controller/index.js';

const app = express();

app.use(cors('*'));
app.use(nocache());

app.use(
    bodyParser.json({
        limit: '15360mb',
        type: 'application/json',
    })
);

app.use(
    bodyParser.urlencoded({
        limit: '15360mb',
        extended: true,
        parameterLimit: 5000000,
        type: 'application/json',
    })
);

app.use('/api/webp/converter', Main.compressImage);

const port = 9200;
const runningMessage = 'Server is running on port ' + port;

app.listen(port, () => {
    console.log(runningMessage);
});