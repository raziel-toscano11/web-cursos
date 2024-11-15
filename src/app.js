import express from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

//Ruta para comprobar que el servidor esta encendido
app.get('/api/isAlive', (req, res) => {
    res.send({message: 'Hello World'});
});

app.use("/api", authRoutes);
app.use("/api", cursosRoutes);
app.use("/api", paymentRoutes);
app.use("/api", usersRoutes);

export default app;
