import { Router } from 'express';

const router = Router();

import controllers from 'controllers';

router.post('/', controllers.getIn('signUp'));

export default router;
