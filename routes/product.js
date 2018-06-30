import { Router } from 'express';
import controllers from 'controllers';
import isAuth from 'middlewares/isAuth';
const router = Router();

router.get('/', isAuth, controllers.getIn('product', 'getAll')).post('/', isAuth, controllers.getIn('product', 'addProduct'));
// router.get('/:id', isAuth, controller.getById);
// router.get('/:id/reviews', isAuth, controller.getReviewsById);

export default router;