import { Router } from 'express';
import controllers from 'controllers';
import isAuth from 'middlewares/isAuth';
import lastModifiedDate from 'middlewares/lastModifiedDate';

const router = Router();

router
	.get('/', isAuth, controllers.getIn('product', 'getAll'))
	.get('/:id', isAuth, controllers.getIn('product', 'getById'))
	.get('/:id/reviews', isAuth, controllers.getIn('product', 'getReviewsById'))
	.post('/', isAuth, lastModifiedDate, controllers.getIn('product', 'addProduct'))
	.delete('/:id', isAuth, controllers.getIn('product', 'deleteById'));

export default router;