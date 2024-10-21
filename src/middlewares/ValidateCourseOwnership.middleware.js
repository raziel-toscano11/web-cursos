import Course from '../models/courses/course.model.js';

export const ownsCourse = async (req, res, next) => {
    try {
        const { id } = req.params;//ID del curso
        const course = await Course.findById(id);

        if (!course) { 
            return res.status(404).json({message: "Curso no encontrado"});
        }

        if(course.instructor_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "No tienes permiso para realizar esta accion"});
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};