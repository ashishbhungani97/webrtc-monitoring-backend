import { Express } from 'express';
import { specRouter } from '../api/v1/specs';
import { accountRouter } from '../api/v1/account';
import { usersRouter } from '../api/v1/users';
import { uploadRouter } from '../api/v1/upload';
import { authRouter } from '../api/v1/auth';
import { feedbackRouter } from '../api/v1/feedback';
import { recordingRouter } from '../api/v1/recording';
import { subscriptionRouter } from '../api/v1/subscription';
import { reportsRouter } from '../api/v1/reports';
import { fsRouter } from '../api/v1/fs';
import { pluginRouter } from '../api/v1/plugin';
import { miscRouter } from '../api/v1/misc';

export const setupRoutesV1 = (app: Express): void => {
  app.use('/v1/spec', specRouter);
  app.use('/v1/account', accountRouter);
  app.use('/v1/users', usersRouter);
  app.use('/v1/upload', uploadRouter);
  app.use('/v1/auth', authRouter);
  app.use('/v1/feedback', feedbackRouter);
  app.use('/v1/recording', recordingRouter);
  app.use('/v1/subscription', subscriptionRouter);
  app.use('/v1/fs', fsRouter);
  app.use('/v1/plugin', pluginRouter);
  app.use('/v1/reports', reportsRouter);
  app.use('/v1/misc', miscRouter);
};
