import Course from "../models/courses/course.model.js";
import fs from "fs";
import path from "path";

//Obtener todos los cursos disponibles
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor_id",
      "name username"
    );
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los cursos", error: error.message });
  }
};

//Obtener un curso especifico
export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate(
      "instructor_id",
      "name username _id"
    );

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el curso", error: error.message });
  }
};

//Obtener los cursos creados por un instructor especifico
export const getInstructorCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor_id = id;

    const courses = await Course.find({ instructor_id }).populate(
      "instructor_id",
      "name username"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron cursos para este instructor" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los cursos", error: error.message });
  }
};

//Obtener los cursos creados por el instructor logeado
export const getMyCreatedCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ instructor_id: instructorId }).populate(
      "instructor_id",
      "name username"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No has creado ningún curso aún" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los cursos", error: error.message });
  }
};

//Crear un curso nuevo
export const createCourse = async (req, res) => {
  const { title, description, price, category } = req.body;

  const instructor_id = req.user._id;

  if (!title || !description || !price || !category) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
    const image = req.file ? `/uploads/courses/${req.file.filename}` : null; // Ruta de la imagen
    const newCourse = new Course({
      title,
      description,
      price,
      category,
      instructor_id,
      image,
    });

    //Guardamos el nuevo curso en la base de datos
    const savedCourse = await newCourse.save();

    //Enviamos la respuesta con el curso creado
    res.status(201).json(savedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el curso", error: error.message });
  }
};

// Actualizar un curso existente
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Actualizar campos enviados en el body
    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = price;
    if (category) course.category = category;

    // Actualizar la imagen si se envió un nuevo archivo
    if (req.file) {
      // Elimina la imagen anterior del servidor
      if (course.image) {
        const previousImagePath = path.join(process.cwd(), course.image);
        fs.unlink(previousImagePath, (err) => {
          if (err) {
            console.error("Error al eliminar la imagen anterior:", err.message);
          }
        });
      }

      // Asigna la nueva imagen
      course.image = `/uploads/courses/${req.file.filename}`;
    }

    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el curso", error: error.message });
  }
};


//Crear capitulos de un curso
export const createChapter = async (req, res) => {
  try {
    const { title, description, temas } = req.body;
    const { id: courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    const newChapter = {
      title,
      description,
      //temas: temas || []
      topics: [],
    };

    course.chapters.push(newChapter);

    await course.save();

    // Obtener el ID del capítulo recién creado
    const addedChapter = course.chapters[course.chapters.length - 1];

    res
      .status(201)
      .json({
        message: "Capítulo añadido exitosamente",
        chapter: addedChapter,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el capítulo", error: error.message });
  }
};

//Agregar temas a un capitulo de un curso
export const addTopicToChapter = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { title, description, resources } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    const chapter = course.chapters.id(chapterId);

    if (!chapter) {
      return res.status(404).json({ message: "Capítulo no encontrado" });
    }

    // Creamos el nuevo tema
    const newTopic = {
      title,
      description,
      //resources: resources || []
      resources: [],
    };

    chapter.temas.push(newTopic);

    await course.save();

    res
      .status(201)
      .json({ message: "Tema añadido exitosamente", topic: newTopic });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al añadir el tema", error: error.message });
  }
};

// Eliminar un curso existente
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el curso por ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Eliminar la imagen asociada si existe
    if (course.image) {
      const imagePath = path.join(process.cwd(), course.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen del curso:", err.message);
        }
      });
    }

    // Eliminar el curso de la base de datos
    await course.deleteOne();

    res.status(200).json({ message: "Curso eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el curso",
      error: error.message,
    });
  }
};