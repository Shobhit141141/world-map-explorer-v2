import { Request, Response } from 'express';
import Bookmark from '../models/bookmark';
import { handleResponse } from '../utils/responseHandler';

/**
 * Creates a new bookmark.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message and the created bookmark.
 * 
 * @throws {500} If an error occurs while creating the bookmark.
 */
export const createBookmark = async (req: Request, res: Response) => {
  const { name, coordinates } = req.body;

  try {
    const bookmark = await Bookmark.create({ userId: req.user?.userId, name, coordinates });
    handleResponse(res, 201, true, 'Bookmark created successfully', bookmark);
  } catch (error) {
    handleResponse(res, 500, false, 'Error creating bookmark', error);
  }
};

/**
 * Fetches all bookmarks of the logged-in user.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A list of bookmarks.
 * 
 * @throws {500} If an error occurs while fetching bookmarks.
 */
export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const bookmarks = await Bookmark.findAll({ where: { userId: req.user?.userId } });
    handleResponse(res, 200, true, 'Bookmarks fetched successfully', bookmarks);
  } catch (error) {
    handleResponse(res, 500, false, 'Error fetching bookmarks', error);
  }
};

/**
 * Fetches a bookmark by id.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns The bookmark.
 * 
 * @throws {404} If the bookmark is not found.
 * @throws {500} If an error occurs while fetching the bookmark.
 */
export const updateBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, coordinates } = req.body;

  try {
    const bookmark = await Bookmark.findOne({ where: { id, userId: req.user?.userId } });

    if (!bookmark) {
      return handleResponse(res, 404, false, 'Bookmark not found');
    }

    bookmark.name = name;
    bookmark.coordinates = coordinates;
    await bookmark.save();

    handleResponse(res, 200, true, 'Bookmark updated successfully', bookmark);
  } catch (error) {
    handleResponse(res, 500, false, 'Error updating bookmark', error);
  }
};

/**
 * Deletes a bookmark by id.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * 
 * @returns A success message.
 * 
 * @throws {404} If the bookmark is not found.
 * @throws {500} If an error occurs while deleting the bookmark.
 */
export const deleteBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bookmark = await Bookmark.findOne({ where: { id, userId: req.user?.userId } });

    if (!bookmark) {
      return handleResponse(res, 404, false, 'Bookmark not found');
    }

    await bookmark.destroy();
    handleResponse(res, 200, true, 'Bookmark deleted successfully');
  } catch (error) {
    handleResponse(res, 500, false, 'Error deleting bookmark', error);
  }
};