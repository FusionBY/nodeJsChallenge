import { Router } from 'express';
import controllers from 'controllers';
import lastModifiedDate from 'middlewares/lastModifiedDate';

const router = Router();

router
	.get('/', controllers.getIn('city', 'all'))
	.post('/', lastModifiedDate, controllers.getIn('city', 'add'))
	.put('/:id', lastModifiedDate, controllers.getIn('city', 'updateOrCreate'))
	.delete('/:id', controllers.getIn('city', 'removeOne'));

export default router;
