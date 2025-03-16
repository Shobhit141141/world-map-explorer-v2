import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { CONSTANTS } from './src/config/constants';
import bodyParser from 'body-parser';
import { logSuccess } from './src/utils/logger';
import { handleResponse } from './src/utils/responseHandler';
import { errorHandler } from './src/middlewares/errorhandler';
import sequelize from './src/config/db';

import helmet from 'helmet';
import User from './src/models/user';
import Bookmark from './src/models/bookmark';
import Settings from './src/models/settings';
import registerRoutes from './src/routes';
dotenv.config();

const app = express();

app.use(cors());
app.use(errorHandler);
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

registerRoutes(app);
const PORT = CONSTANTS.PORT;

sequelize.sync({ alter: true }).then(async () => {
  await User.sync({ alter: true });
  await Bookmark.sync({ alter: true });
  await Settings.sync({ alter: true });

  app.listen(PORT, () => {
    logSuccess(`Server running on port ${PORT}`);
  });
});

export default app;
