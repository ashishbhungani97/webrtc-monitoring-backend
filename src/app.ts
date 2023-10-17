import express from 'express';
import { setupExpress } from './config/express';
import { handleMissing, handleErrors } from './middleware';
import { setupMongoose } from './config/mongoose';
import { setupRoutesV1 } from './config/routes';
import { MONGO_URI } from './config/secrets';
// import cros from 'cors'

setupMongoose(MONGO_URI);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

setupExpress(app);
setupRoutesV1(app);

// TODO: configure CORS
// app.use(
//   cors({
//     origin: true,
//   })
// );
app.use(handleMissing);
app.use(handleErrors);

export default app;
