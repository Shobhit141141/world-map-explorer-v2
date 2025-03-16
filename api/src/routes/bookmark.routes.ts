import express from 'express';
import { createBookmark, deleteBookmark, getBookmarks, updateBookmark } from '../controller/bookmark.controller';

const router = express.Router();


router.post('/', createBookmark);
router.get('/', getBookmarks);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);


export default router;
