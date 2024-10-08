import { Router } from "express";

const router = Router();

//Rutas para Autenticacion

router.post('/register', (req, res) => {
    res.send('Ruta de registro de usuario');
})

router.post('/login', (req, res) => {
    res.send('Ruta de inicio de sesion');
})
router.post('/logout', (req, res) => {
    res.send('Ruta de cierre de sesion');
})


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