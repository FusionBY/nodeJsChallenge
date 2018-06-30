import { Router } from 'express';
import isAuth from 'middlewares/isAuth';
import controllers from 'controllers';

const router = Router();

router.get('/', isAuth, controllers.getIn('user'));

export default router;
