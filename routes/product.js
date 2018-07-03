import { Router } from 'express';
import controllers from 'controllers';
import lastModifiedDate from 'middlewares/lastModifiedDate';

const router = Router();

router
	.get('/', controllers.getIn('product', 'getAll'))
	.get('/:id', controllers.getIn('product', 'getById'))
	.get('/:id/reviews', controllers.getIn('product', 'getReviewsById'))
	.post('/', lastModifiedDate, controllers.getIn('product', 'addProduct'))
	.delete('/:id', controllers.getIn('product', 'deleteById'));

export default router;