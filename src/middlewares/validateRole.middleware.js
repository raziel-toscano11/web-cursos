export const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor" && req.user.role !== "both") {
    return res
      .status(403)
      .json({ message: "Acceso denegado, se requiere rol de instructor" });
  }
  next();
};
