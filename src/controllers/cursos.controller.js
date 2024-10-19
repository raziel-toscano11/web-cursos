import Curso from '../models/course.model.js';

export const getCursos = async (req, res) => {
    const cursos = await Curso.find({
        user: req.user.id
    }).populate('user');
    res.json(cursos);
};