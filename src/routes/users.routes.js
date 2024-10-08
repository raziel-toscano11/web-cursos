import { Router } from "express";
import { promises as fs } from "fs";

const router = Router();

/* //Rutas de Usuarios (Estudiante y Profesor)
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
}); */

const readData = async () => {
    try {
      const data = await fs.readFile("./src/db.json", "utf-8");
      console.log(data);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const writeData = async (data) => {
    try {
      await fs.writeFile("./src/db.json", JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
    }
  };

  router.get("/users", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      res.json(data.users); // Envía los usuarios en la respuesta
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  });
  
  router.get("/users/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const id = parseInt(req.params.id);
      const user = data.users.find((user) => user.id === id);
  
      if (user) {
        res.json(user); // Envía el usuario si se encuentra
      } else {
        res.status(404).json({ message: "User not found" }); // Devuelve 404 si no se encuentra el usuario
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  });
  
  router.post("/users", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const body = req.body;
  
      const newUser = {
        id: data.users.length + 1, // Genera un nuevo ID
        ...body,
      };
  
      data.users.push(newUser); // Agrega el nuevo user a la lista
      await writeData(data); // Guarda los datos actualizados de forma asíncrona
  
      res.json(newUser); // Envía el nuevo libro como respuesta
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      res.status(500).json({ message: "Error al agregar el usuario" });
    }
  });
  
  router.put("/users/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const body = req.body;
      const id = parseInt(req.params.id);
  
      const userIndex = data.users.findIndex((user) => user.id === id);
  
      if (userIndex !== -1) {
        data.users[userIndex] = {
          ...data.users[userIndex], // Mantiene los datos existentes del usuario
          ...body, // Sobrescribe con los nuevos datos
        };
  
        await writeData(data); // Guarda los datos actualizados de forma asíncrona
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  });
  
  router.delete("/users/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const id = parseInt(req.params.id);
      const userIndex = data.users.findIndex((user) => user.id === id);
  
      if (userIndex !== -1) {
        data.users.splice(userIndex, 1); // Elimina el usuario de la lista
        await writeData(data); // Asegúrate de que writeData sea también una función asíncrona si está escribiendo en un archivo
  
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" }); // Devuelve 404 si el libro no existe
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  });


export default router;