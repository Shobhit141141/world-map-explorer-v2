
import express from 'express';
import { getProfile } from '../controller/user.controller';
const router = express.Router();

router.post('/profile', getProfile);


export default router;
