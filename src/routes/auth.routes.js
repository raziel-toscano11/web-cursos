import { Router } from "express";
import { login, register, profile } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router();

//Rutas para Autenticacion

router.post('/register', validateSchema(registerSchema), register);

router.post('/login',validateSchema(loginSchema), login);

router.post('/logout', (req, res) => {
    res.send('Ruta de cierre de sesion');
});


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