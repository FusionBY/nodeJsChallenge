import { Router } from 'express';
import controller from 'controllers/product.controller';
import isAuth from 'middlewares/isAuth';
const router = Router();

router.get('/', isAuth, controller.getAll).post('/', isAuth, controller.addProduct);
// router.get('/:id', isAuth, controller.getById);
// router.get('/:id/reviews', isAuth, controller.getReviewsById);

export default router;