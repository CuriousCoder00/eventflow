import { Router } from 'express';
import { loginController, logoutController, registrationController } from '../controllers/auth.controller';
import { middleware } from '../lib/middleware';

/**
 * Auth router
 * @description Auth routes
 * @route /api/v1/auth
 * @type Router
 */
const authRouter: Router = Router();

// Register and login routes
authRouter.post('/register', registrationController);
authRouter.post('/login', loginController);

authRouter.post('/logout', middleware, logoutController);

export default authRouter;