import express from 'express';
import { createKeyBinding, deleteKeyBinding, getKeyBindings, updateKeyBinding } from '../controller/key.binding.controller';
const router = express.Router();

router.post('/', createKeyBinding);
router.get('/', getKeyBindings);
router.put('/:id', updateKeyBinding);
router.delete('/:id', deleteKeyBinding);


export default router;
