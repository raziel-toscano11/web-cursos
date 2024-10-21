import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';


export const authRequired = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtener el token después de "Bearer"
    
    if (!token) {
        return res.status(401).json({ message: "Sin token, autorización denegada" });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token inválido" });

        try {
            //Buscamos al usuario en la base de datos utilizando el ID decodificado
            const user = await User.findById(decoded.id); 

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            console.log(user._id);

            req.user = user;//Asignamos el documento completo del usuario a req.user
            next();
        } catch (error) {
            return res.status(500).json({ message: "Error del servidor", error: error.message });
        }
    });
};
