import { Router } from 'express';
import controllers from 'controllers';

const router = Router();

router.get('/', controllers.getIn('user'));

export default router;
