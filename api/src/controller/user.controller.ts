import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { CONSTANTS } from '../config/constants';
import { handleResponse } from '../utils/responseHandler';
const { JWT_SECRET } = CONSTANTS;

/**
 * Registers a new user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns A success message and the registered user.
 *
 * @throws {500} If an error occurs while registering the user.
 */
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    handleResponse(res, 201, true, 'User registered successfully', { user, token });
  } catch (error) {
    handleResponse(res, 500, false, 'Error registering user', error);
  }
};

/**
 * Logs in a user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns A success message and a JWT token.
 *
 * @throws {401} If the email or password is invalid.
 * @throws {500} If an error occurs while logging in the user.
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleResponse(res, 401, false, 'Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    handleResponse(res, 200, true, 'User logged in successfully', { token });
  } catch (error) {
    handleResponse(res, 500, false, 'Error logging in user', error);
  }
};

/**
 * Fetches the profile of the logged-in user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns The profile of the logged-in user.
 *
 * @throws {404} If the user is not found.
 * @throws {500} If an error occurs while fetching the profile.
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return handleResponse(res, 404, false, 'User not found');
    }
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return handleResponse(res, 404, false, 'User not found');
    }

    handleResponse(res, 200, true, 'Profile fetched successfully', user);
  } catch (error) {
    handleResponse(res, 500, false, 'Error fetching profile', error);
  }
};
