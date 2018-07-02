import { Router } from 'express';
import controllers from 'controllers';
import isAuth from 'middlewares/isAuth';

const router = Router();

router.get('/', isAuth, controllers.getIn('refreshToken'));

export default router;
