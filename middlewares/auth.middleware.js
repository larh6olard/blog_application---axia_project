import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/app.error.js";

const auth = async (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(new ApiError(401, "Authentication required"));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    const user = await userModel.findById(payload.sub).select("-password");
    if (!user) return next(new ApiError(401, "Invalid token"));
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export { auth };