import { Request, Response } from 'express';
import KeyBinding from '../models/keyBinding';
import { handleResponse } from '../utils/responseHandler';

/**
 * Creates a new key binding.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message and the created key binding.
 * 
 * @throws {500} If an error occurs while creating the key binding.
 */
export const createKeyBinding = async (req: Request, res: Response) => {
  const { key, action } = req.body;

  try {
    const keyBinding = await KeyBinding.create({ userId: req.user?.userId, key, action });
    handleResponse(res, 201, true, 'Key binding created successfully', keyBinding);
  } catch (error) {
    handleResponse(res, 500, false, 'Error creating key binding', error);
  }
};

/**
 * Fetches all key bindings of the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A list of key bindings.
 * 
 * @throws {500} If an error occurs while fetching key bindings.
 */
export const getKeyBindings = async (req: Request, res: Response) => {
  try {
    const keyBindings = await KeyBinding.findAll({ where: { userId: req.user?.userId } });
    handleResponse(res, 200, true, 'Key bindings fetched successfully', keyBindings);
  } catch (error) {
    handleResponse(res, 500, false, 'Error fetching key bindings', error);
  }
};

/**
 * Fetches a key binding by id.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns The key binding.
 * 
 * @throws {404} If the key binding is not found.
 * @throws {500} If an error occurs while fetching the key binding.
 */
export const updateKeyBinding = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { key, action } = req.body;

  try {
    const keyBinding = await KeyBinding.findOne({ where: { id, userId: req.user?.userId } });

    if (!keyBinding) {
      return handleResponse(res, 404, false, 'Key binding not found');
    }

    keyBinding.key = key;
    keyBinding.action = action;
    await keyBinding.save();

    handleResponse(res, 200, true, 'Key binding updated successfully', keyBinding);
  } catch (error) {
    handleResponse(res, 500, false, 'Error updating key binding', error);
  }
};

/**
 * Deletes a key binding by id.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message.
 * 
 * @throws {404} If the key binding is not found.
 * @throws {500} If an error occurs while deleting the key binding.
 */
export const deleteKeyBinding = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const keyBinding = await KeyBinding.findOne({ where: { id, userId: req.user?.userId } });

    if (!keyBinding) {
      return handleResponse(res, 404, false, 'Key binding not found');
    }

    await keyBinding.destroy();
    handleResponse(res, 200, true, 'Key binding deleted successfully');
  } catch (error) {
    handleResponse(res, 500, false, 'Error deleting key binding', error);
  }
};