import { Request, Response } from 'express';
import Log from '../models/logs';
import { handleResponse } from '../utils/responseHandler';

/**
 * Adds a log entry for the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message and the added log entry.
 * 
 * @throws {500} If an error occurs while adding the log.
 */
export const addLog = async (req: Request, res: Response) => {
  const { locationName, locationCoordinates } = req.body;

  try {
    const userId = req.user?.userId;
    const log = await Log.findOne({ where: { userId } });
    const newLogEntry = {
      timestamp: new Date(),
      locationName,
      locationCoordinates,
    };

    if (!log) {
      const newLog = await Log.create({ userId, logs: [newLogEntry] });
      await newLog.save();
    } else {
      log.logs.push(newLogEntry);
      await log.save();
    }

    return handleResponse(res, 201, true, 'Log added successfully', newLogEntry);
  } catch (error) {
    return handleResponse(res, 500, false, 'Error adding log', error);
  }
};

/**
 * Fetches the logs of the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns The logs.
 * 
 * @throws {404} If the logs are not found.
 * @throws {500} If an error occurs while fetching the logs.
 */
export const getLogs = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const log = await Log.findOne({ where: { userId } });

    if (!log) {
      return handleResponse(res, 404, false, 'Logs not found');
    }

    return handleResponse(res, 200, true, 'Logs fetched successfully', log.logs);

  } catch (error) {
    return handleResponse(res, 500, false, 'Error fetching logs', error);
  }
};
