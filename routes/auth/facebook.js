import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/', passport.authenticate('facebook', { session: false }), (req, res) => {
	res.status(200).json('success');
});


export default router;