import User from '../models/user.model.js';

export const becomeInstructor = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(user.role === 'instructor') {
            return res.status(400).json({message: 'Ya eres un instructor'});
        }

        user.role = 'instructor';
        await user.save();

        res.status(200).json({message: "Ahora eres un instructor", role: user.role})
    } catch (error) {
        res.status(500).json({message: "Error al cambiar rol", error: error.message})
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la ruta
        const { name, email, password } = req.body; // Extraemos los campos que queremos actualizar desde el body

        // Verificamos si el usuario existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizamos solo los campos que se envían en el body
        if (name) user.name = name;
        if (email) user.email = email;

        // Si el usuario proporciona un nuevo password, actualizamos la contraseña
        if (password) {
            // Si tienes alguna lógica para encriptar la contraseña, como bcrypt, úsala aquí
            user.password = await bcrypt.hash(password, 10);  // Asegúrate de manejar esto correctamente
        }

        // Guardamos los cambios
        const updatedUser = await user.save();

        res.status(200).json({
            message: "Perfil actualizado con éxito",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                // No regresamos la contraseña por seguridad
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};