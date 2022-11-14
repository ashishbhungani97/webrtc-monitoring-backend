import { Server } from 'socket.io';
import {
  SOCKET_CLIENT_JOINED,
  SOCKET_CLIENT_LEFT,
  SOCKET_REPORT_STATS,
  SOCKET_CONNECTION_INFO,
  SOCKET_OTHER_INFO,
  SOCKET_MEDIA_INFO,
} from '@meetrix/webrtc-monitoring-common-lib';
import logger from '../../../util/logger';
import {
  addActivePluginClient,
  removePluginClient,
} from '../../../util/redis/plugins';
import {
  socketPluginAuth,
  SocketWithPluginAuthType,
} from '../../../middleware/socket/socketAuth';
import { APP_SOCKET_CLIENT_SPACE, APP_SOCKET_USER_SPACE } from '../../settings';
import { Stat, StatType } from '../../../models/Stat';
import { Participant } from '../../../models/Participant';

export const dblogger = async (data: StatType): Promise<void> => {
  const participant = await Participant.findOne({
    participantRoomJid: data.participantJid,
  }).sort({
    joined: 'desc',
  });
  if (!participant) {
    logger.debug(`Participant not found: ${data.participantJid}`);
    return;
  }
  const payload = {
    ...data,
    participantId: participant._id,
    roomId: participant.roomId,
  };
  const stat = new Stat(payload);
  stat.save();

  console.log(stat);
};
export default async (io: Server): Promise<void> => {
  const clientSpace = io.of(APP_SOCKET_CLIENT_SPACE);
  const userSpace = io.of(APP_SOCKET_USER_SPACE);
  clientSpace.use(socketPluginAuth);
  clientSpace.on('connection', (socket: SocketWithPluginAuthType) => {
    const { domain, clientId } = socket.auth;
    logger.info(
      `plugin with domain: ${domain}, socketId: ${socket.id}, clientId: ${clientId} connected`
    );
    const room = socket.auth.clientId as string;
    addActivePluginClient({
      domain,
      clientId,
    });
    userSpace.to(domain).emit(SOCKET_CLIENT_JOINED, {
      clientId,
      domain,
    });
    socket.on(SOCKET_REPORT_STATS, async (data) => {
      logger.debug(`emitting stats to room: ${room}`);
      userSpace.to(room).emit(SOCKET_REPORT_STATS, data);
      dblogger(data);
    });
    socket.on(SOCKET_CONNECTION_INFO, (data) => {
      logger.debug(`emitting connectionInfo to room: ${room}`);
      userSpace.to(room).emit(SOCKET_CONNECTION_INFO, data);
    });
    socket.on(SOCKET_OTHER_INFO, (data) => {
      logger.debug(`emitting other to room: ${room}`);
      userSpace.to(room).emit(SOCKET_OTHER_INFO, data);
      dblogger(data);
    });
    socket.on(SOCKET_MEDIA_INFO, (data) => {
      logger.debug(`emitting mediaInfo to room: ${room}`);
      userSpace.to(room).emit(SOCKET_MEDIA_INFO, data);
    });
    socket.on('disconnect', () => {
      removePluginClient({
        domain,
        clientId,
      });
      userSpace.to(domain).emit(SOCKET_CLIENT_LEFT, {
        clientId,
        domain,
      });
    });
  });
};
