import express from 'express';
import { setupExpress } from './config/express';
import { handleMissing, handleErrors } from './middleware';
import { setupMongoose } from './config/mongoose';
import { setupRoutesV1 } from './config/routes';
import { MONGO_URI } from './config/secrets';
import cors from 'cors'

setupMongoose(MONGO_URI);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
