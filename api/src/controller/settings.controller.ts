import { Request, Response } from 'express';
import Settings from '../models/settings';
import { handleResponse } from '../utils/responseHandler';

/**
 * Updates the settings of the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message and the updated settings.
 * 
 * @throws {404} If the settings are not found.
 * @throws {500} If an error occurs while updating the settings.
 */
export const updateSettings = async (req: Request, res: Response) => {
  const { cursorSize, cursorAngle } = req.body;

  try {
    const settings = await Settings.findOne({ where: { userId: req.user?.userId } });

    if (!settings) {
      return handleResponse(res, 404, false, 'Settings not found');
    }

    settings.cursorSize = cursorSize;
    settings.cursorAngle = cursorAngle;
    await settings.save();

    handleResponse(res, 200, true, 'Settings updated successfully', settings);
  } catch (error) {
    handleResponse(res, 500, false, 'Error updating settings', error);
  }
};


/**
 * Fetches the settings of the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns The settings.
 * 
 * @throws {404} If the settings are not found.
 * @throws {500} If an error occurs while fetching the settings.
 */
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne({ where: { userId: req.user?.userId } });

    if (!settings) {
      return handleResponse(res, 404, false, 'Settings not found');
    }

    handleResponse(res, 200, true, 'Settings fetched successfully', settings);
  } catch (error) {
    handleResponse(res, 500, false, 'Error fetching settings', error);
  }
};
