import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/new-user', userController.createNewUser);

// get user
router.get('/', userController.getDBExistingUsers);

export const userRoutes = router;
