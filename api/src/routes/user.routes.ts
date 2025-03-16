
import express from 'express';
import { getProfile, updateProfile } from '../controller/user.controller';
const router = express.Router();

router.post('/profile', getProfile);
router.put('/update/profile', updateProfile);


export default router;
