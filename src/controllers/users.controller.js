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