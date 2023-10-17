import { createServer } from 'http';
import app from './app';
import logger from './util/logger';
import configSockets from './config/sockets';
const cors = require('cors');


const httpServer = createServer(app);
configSockets(httpServer);


app.use(cors({
  origin: '*'
}));

httpServer.listen(app.get('port'), (): void => {
  logger.info(
    `App is running at http://localhost:${app.get(
      'port'
    )}/v1/spec/ in ${app.get('env')} mode`
  );
});
export default httpServer;
