import { Express } from 'express';
import { handleResponse } from '../utils/responseHandler';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import bookmarkRoutes from './bookmark.routes';
import keyBindingRoutes from './key.binding.routes';
import settingsRoutes from './settings.routes';
import logRoutes from './logs.routes';
import verifyAuth from '../middlewares/verifyAuth';

const registerRoutes = (app: Express): void => {
  app.get('/', (_, res) => {
    handleResponse(res, 200, true, 'Welcome to API');
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/user', verifyAuth, userRoutes);
  app.use('/api/v1/bookmark', verifyAuth, bookmarkRoutes);
  app.use('/api/v1/key-binding', verifyAuth, keyBindingRoutes);
  app.use('/api/v1/settings', verifyAuth, settingsRoutes);
  app.use('/api/v1/logs', verifyAuth, logRoutes);

  app.all('*', (_, res) => {
    handleResponse(res, 404, false, 'Route not found');
  });
};

export default registerRoutes;
