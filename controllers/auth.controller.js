import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/app.error.js";
import asyncHandler from "../utils/async.handler.js";
import { loginSchema, registerSchema } from "../validators/auth.schema.js";

const signToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const exists = await userModel.findOne({ email: data.email });
  if (exists) throw new ApiError(409, "Email already in use");

  const user = await userModel.create(data);
  const token = signToken(user);
  res
    .status(201)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    throw new ApiError(401, "Invalid credentials");

  const token = signToken(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

const user = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});


export { register, login, user };