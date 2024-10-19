import { Router } from "express";
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

//Rutas para Autenticacion

router.post('/register', validateSchema(registerSchema), register);

router.post('/login',validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

/* app.post('/login', (req, res) => {
    res.send('Ruta de inicio de sesion');
});

app.post('/register', (req, res) => {
    res.send('Ruta de registro de usuario');
});

app.post('/logout', (req, res) => {
    res.send('Ruta de cierre de sesion');
}); */

export default router;