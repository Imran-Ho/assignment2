import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/new-user', userController.createNewUser);

router.get('', userController.getDBExistingUsers);
router.put('/:userId', userController.updatedUserInfo);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteSingleUser);

export const userRoutes = router;
