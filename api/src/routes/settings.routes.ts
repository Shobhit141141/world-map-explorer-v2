import express from 'express';
import { getSettings, updateSettings } from '../controller/settings.controller';
const router = express.Router();

router.put('/', updateSettings);
router.get('/', getSettings);

export default router;
