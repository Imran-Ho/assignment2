import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('', userController.createNewUser);

router.get('', userController.getDBExistingUsers);
router.put('/:userId', userController.updatedUserInfo);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteSingleUser);

//orders api section.
router.put('/:userId/orders', userController.NewProductAddedToOrder);
router.get('/:userId/orders', userController.GetOrdersOfAUser);
router.get(
  '/:userId/orders/total-price',
  userController.CalculateTotalPriceOfOrders,
);

export const userRoutes = router;
