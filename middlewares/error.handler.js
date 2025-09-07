import { ZodError } from "zod";

const notFound = (_req, res, _next) =>
  res.status(404).json({ message: "Route not found" });

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: err.errors });
  }
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  if (process.env.NODE_ENV !== "production") console.error(err);
  return res.status(status).json({ message });
};

export { notFound, errorHandler };