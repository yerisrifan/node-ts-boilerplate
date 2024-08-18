import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

export default router;
