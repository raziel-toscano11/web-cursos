import { Router } from "express";

const router = Router();

//Rutas de Usuarios (Estudiante y Profesor)
router.get('/users/perfil', (req, res) => {
    res.send('Ruta que devuelve el perfil del usuario logeado');
});

router.put('/users/perfil/editar', (req, res) => {
    res.send('Ruta para editar el perfil del usuario logeado');
});

router.get('/users/:id', (req, res) => {
    res.send('Ruta que devuelve el perfil de otro usuario');
});

//Rutas de Usuarios (Profesor)
router.post('/cursos', (req, res) => {
    res.send('Ruta para crear un nuevo curso');
});

router.put('/cursos/:id', (req, res) => {
    res.send('Ruta para editar un cursos');
});

router.delete('/cursos/:id', (req, res) => {
    res.send('Ruta para eliminar un curso'); //Pendiente a revision
});

router.get('/users/cursos/creados', (req, res) => {
    res.send('Ruta que duelve los cursos creados por un profesor');
});


export default router;