export const isProfileOwner = (req, res, next) => {
    const userIdFromParams = req.params.id; // ID en los parámetros de la solicitud
    const userIdFromToken = req.user._id;   // ID del usuario autenticado en el token (almacenado en `req.user`)

    // Comparamos el ID del usuario logeado con el ID que se está intentando modificar
    if (userIdFromParams !== userIdFromToken.toString()) {
        return res.status(403).json({ message: "No tienes permiso para editar este perfil" });
    }

    // Si los IDs coinciden, permitimos que continúe la solicitud
    next();
};
