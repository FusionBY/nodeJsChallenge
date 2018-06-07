import { Router } from 'express';
import controller from 'controllers/product.controller';
const router = Router();

router.get('/', controller.getAll).post('/', controller.addProduct);;
router.get('/:id', controller.getById);
router.get('/:id/reviews', controller.getReviewsById);

export default router;