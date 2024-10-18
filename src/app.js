import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

//Ruta para comprobar que el servidor esta encendido
app.get('/api/isAlive', (req, res) => {
    res.send({message: 'Hello World'});
});

app.use("/api", authRoutes);
app.use("/api", cursosRoutes);
app.use("/api", paymentRoutes);
app.use("/api", usersRoutes);

export default app;
