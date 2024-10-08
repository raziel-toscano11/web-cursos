import app from "./app.js";
import { APP_NAME } from "./config.js";
import { PORT } from "./config.js";
import { CASE_SENSITIVE_ROUTING } from "./config.js";

app.set('appName', APP_NAME);
app.set('port', PORT);
app.set('case sensitive routing', CASE_SENSITIVE_ROUTING);

app.listen(app.get('port'));
console.log(`Server ${app.get('appName')} running on port ${app.get('port')}`);


































/* const readData = async () => {
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
  
  app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node js!");
  });
  
  app.get("/books", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      res.json(data.books); // Envía los libros en la respuesta
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      res.status(500).json({ message: "Error al obtener los libros" });
    }
  });
  
  app.get("/books/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const id = parseInt(req.params.id);
      const book = data.books.find((book) => book.id === id);
  
      if (book) {
        res.json(book); // Envía el libro si se encuentra
      } else {
        res.status(404).json({ message: "Book not found" }); // Devuelve 404 si no se encuentra el libro
      }
    } catch (error) {
      console.error("Error al obtener el libro:", error);
      res.status(500).json({ message: "Error al obtener el libro" });
    }
  });
  
  app.post("/books", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const body = req.body;
  
      const newBook = {
        id: data.books.length + 1, // Genera un nuevo ID
        ...body,
      };
  
      data.books.push(newBook); // Agrega el nuevo libro a la lista
      await writeData(data); // Guarda los datos actualizados de forma asíncrona
  
      res.json(newBook); // Envía el nuevo libro como respuesta
    } catch (error) {
      console.error("Error al agregar el libro:", error);
      res.status(500).json({ message: "Error al agregar el libro" });
    }
  });
  
  app.put("/books/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const body = req.body;
      const id = parseInt(req.params.id);
  
      const bookIndex = data.books.findIndex((book) => book.id === id);
  
      if (bookIndex !== -1) {
        data.books[bookIndex] = {
          ...data.books[bookIndex], // Mantiene los datos existentes del libro
          ...body, // Sobrescribe con los nuevos datos
        };
  
        await writeData(data); // Guarda los datos actualizados de forma asíncrona
        res.json({ message: "Book updated successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      res.status(500).json({ message: "Error al actualizar el libro" });
    }
  });
  
  app.delete("/books/:id", async (req, res) => {
    try {
      const data = await readData(); // Espera a que readData se resuelva
      const id = parseInt(req.params.id);
      const bookIndex = data.books.findIndex((book) => book.id === id);
  
      if (bookIndex !== -1) {
        data.books.splice(bookIndex, 1); // Elimina el libro de la lista
        await writeData(data); // Asegúrate de que writeData sea también una función asíncrona si está escribiendo en un archivo
  
        res.json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({ message: "Book not found" }); // Devuelve 404 si el libro no existe
      }
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      res.status(500).json({ message: "Error al eliminar el libro" });
    }
  }); */