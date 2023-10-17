import express from 'express';
import { setupExpress } from './config/express';
import { handleMissing, handleErrors } from './middleware';
import { setupMongoose } from './config/mongoose';
import { setupRoutesV1 } from './config/routes';
import { MONGO_URI } from './config/secrets';
import cors from 'cors'

setupMongoose(MONGO_URI);

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://reliable-tapioca-f7eba3.netlify.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


setupExpress(app);
setupRoutesV1(app);

// TODO: configure CORS
app.use(
  cors()
);
app.use(handleMissing);
app.use(handleErrors);

export default app;
