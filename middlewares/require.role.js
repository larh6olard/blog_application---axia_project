import { ApiError } from "../utils/app.error.js";

const requireRole =
  (...allowed) =>
  (req, _res, next) => {
    if (!req.user) return next(new ApiError(401, "Authentication required"));
    if (!allowed.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }
    next();
  };

// Convenience for ownership or admin
const allowOwnerOrAdmin = (getOwnerId) => (req, _res, next) => {
  const ownerId = getOwnerId(req);
  if (req.user.role === "admin" || String(ownerId) === String(req.user._id))
    return next();
  return next(new ApiError(403, "Insufficient permissions"));
};

export { requireRole, allowOwnerOrAdmin };