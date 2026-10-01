import { Router } from "express";
import { sanitizedLoginInput } from "./auth.validations.js";
import { login } from "./auth.controller.js";
import { authenticateToken, authorizeRole, AuthRequest } from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login", sanitizedLoginInput, login);

authRouter.get("/me", authenticateToken, (req: AuthRequest, res) => {
    return res.json({
        message: "Authenticated successfully",
        user: req.user
    });
});
authRouter.get(
    "/admin-test",
    authenticateToken,
    authorizeRole("MANAGER"),
    (req: AuthRequest, res) => {
        return res.json({
            message: "Welcome to the admin area",
            user: req.user
        });
    }
);