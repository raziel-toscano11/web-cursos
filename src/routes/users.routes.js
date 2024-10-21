import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js';
import { becomeInstructor, updateUserProfile } from '../controllers/users.controller.js'
import { profile } from '../controllers/auth.controller.js';
import { getInstructorCourses } from '../controllers/cursos.controller.js'
import {isProfileOwner} from '../middlewares/validateProfileOwner.middlewares.js'

const router = Router();

//Rutas sin autenticacion
router.get('/users/:id/courses', getInstructorCourses)

//Rutas de Usuarios (Estudiante y Profesor)
router.get('/users/profile', authRequired, profile);//Obtener datos del perfil

router.put('/users/profile/:id/editar', authRequired, isProfileOwner, updateUserProfile);

router.get('/users/:id', (req, res) => {
    res.send('Ruta que devuelve el perfil de otro usuario');
});

//Rutas de Usuarios (Profesor)

//Dar rol de instructor
router.post('/users/set-instructor-role', authRequired, becomeInstructor);


router.put('/cursos/:id', (req, res) => {
    res.send('Ruta para editar un cursos');
});

router.delete('/cursos/:id', (req, res) => {
    res.send('Ruta para eliminar un curso'); //Pendiente a revision
});

router.get('/cursos-creados', (req, res) => {
    res.send('Ruta que duelve los cursos creados por un profesor');
});


export default router;