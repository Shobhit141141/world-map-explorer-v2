import express from 'express';
import { addLog, getLogs } from '../controller/logs.controller';
const router = express.Router();

router.post('/', addLog);
router.get('/', getLogs);

export default router;
