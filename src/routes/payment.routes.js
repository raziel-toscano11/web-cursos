import { Router } from "express";

const router = Router();

//Rutas de pagos
router.get('/users/metodos-pago', (req, res) => {
    res.send('Ruta que devuelve los metodos de pago del usuario');
});

router.post('/users/metodos-pago', (req, res) => {
    res.send('Ruta que crea un nuevo metodo de pago del usuario');
});

router.put('/users/metodos-pago/:id', (req, res) => {
    res.send('Ruta que edita un metodo de pago del usuario');
});

router.delete('/users/metodos-pago/:id', (req, res) => {
    res.send('Ruta que elimina un metodo de pago del usuario');
});

router.get('/pago/confirmacion', (req, res) => {
    res.send('Ruta que devuelve una confirmacion de pago exitosa');
});

router.post('/cursos/:id/pagar', (req, res) => {
    res.send('Ruta para realizar el pago de un curso');
});

export default router;