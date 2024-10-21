export const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res
      .status(403)
      .json({ message: "Acceso denegado, se requiere rol de instructor" });
  }
  next();
};
