import { Router } from 'express';
import controller from 'controllers/product.controller';
const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id/reviews', controller.getReviewsById);
router.post('/', controller.addProduct);

export default router;