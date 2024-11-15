import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { ownsCourse } from '../middlewares/ValidateCourseOwnership.middleware.js'
import { courseSchema, courseUpdateSchema } from '../schemas/course.schema.js'
import { isInstructor } from '../middlewares/validateRole.middleware.js'
import { getCourses, getCourse, getMyCreatedCourses, createCourse, updateCourse, createChapter, deleteCourse } from '../controllers/cursos.controller.js'
import upload from '../middlewares/imagesCourses.middleware.js'
import multerErrorHandler from "../middlewares/multerErrorHandler.middleware.js";

const router = Router();

//Rutas de Cursos
//Rutas que no requieren autenticacion
router.get('/courses', getCourses);

router.get('/courses/:id', getCourse);

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

//Rutas que requieren autenticacion y rol de instructor
//Crear un curso nuevo
router.post('/courses/create',authRequired, isInstructor, upload.single('image'), multerErrorHandler, validateSchema(courseSchema) ,createCourse);

//Actualizar un curso existente
router.put('/courses/:id/update', authRequired, isInstructor, ownsCourse, upload.single('image'), multerErrorHandler, validateSchema(courseUpdateSchema), updateCourse);

router.delete('/courses/:id/delete', authRequired, isInstructor, ownsCourse, deleteCourse);

//Obtener los cursos creados por el instructor logeado
router.get('/my-created-courses', authRequired, isInstructor, getMyCreatedCourses);

//Crear capitulos de un curso
router.post('/courses/:id/create-chapter', authRequired, isInstructor, ownsCourse, createChapter);

//Agregar temas a un capitulo de un curso
router.post('/courses/:courseId/chapters/:chapterId/add-topic', authRequired, isInstructor, ownsCourse);

export default router;