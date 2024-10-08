import { Router } from "express";

const router = Router();

//Rutas de Cursos
//Rutas que no requieren autenticacion
router.get('/cursos', (req, res) => {
    res.send('Ruta que devuelve los cursos disponibles');
});

router.get('/cursos/:id', (req, res) => {
    res.send('Ruta que devuelve un curso especifico');
});

router.get('/planes', (req, res) => {
    res.send('Ruta que devuelve los planes de pago disponibles');
});

//Rutas que requieren atenticacion
router.get('cursos/mis-cursos', (req, res) => {
    res.send('Ruta que devuelve los cursos que ha comprado el usuario');
});

router.get('cursos/:id/seccion/:n', (req, res) => {
    res.send('Ruta que devuelve una seccion especifica de un curso');
});

export default router;