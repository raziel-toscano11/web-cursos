import { Router } from "express";
import { login, register, logout } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

//Rutas para Autenticacion

router.post('/register', validateSchema(registerSchema), register);

router.post('/login',validateSchema(loginSchema), login);

router.post('/logout', logout);





export default router;