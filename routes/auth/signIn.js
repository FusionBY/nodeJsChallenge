import { Router } from 'express';
import controllers from 'controllers';

const router = Router();

router.post('/', controllers.getIn('signIn'));

export default router;
