import { Socket } from 'socket.io';
import logger from '../util/logger';
import { verify } from '../util/auth';
import { PluginTokenInformation } from '../types/app';
// import { User } from '../models/User';

interface SocketExtended extends Socket {
  auth?: PluginTokenInformation;
}

export const SocketAuth = async (
  socket: SocketExtended,
  next: (err?: Error) => void
): Promise<void> => {
  if (socket.handshake.query && socket.handshake.query.token) {
    try {
      const decodedToken = await verify<PluginTokenInformation>(
        socket.handshake.query.token as string
      );
      socket.auth = decodedToken;
      logger.debug(`socket authenticated user.email: ${decodedToken.website}`);

      // const user = await User.findOne({ email: decodedToken.email });
      // socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  } else {
    next(new Error('Authentication error'));
  }
};
