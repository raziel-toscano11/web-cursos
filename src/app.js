import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import cursosRoutes from "./routes/cursos.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", cursosRoutes);
app.use("/api", paymentRoutes);
app.use("/api", usersRoutes);

export default app;
