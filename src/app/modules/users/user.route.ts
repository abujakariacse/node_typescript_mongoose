import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getUsers);

router.get('/:userId', UserController.getAUser);

router.put('/:userId', UserController.updateUser);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId/orders', UserController.createOrder);

router.get('/:userId/orders', UserController.getOrders);

router.get('/:userId/orders/total-price', UserController.sumOfOrders);

export const UserRoutes = router;
