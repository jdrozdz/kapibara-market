import { Request, Response, NextFunction } from 'express';
import {AppError} from "../../ui/models/middleware/app-error.model";

export const errorHandlerMiddleware =
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500).json({
        "message": error.message || "Internal Server Error",
    })
}