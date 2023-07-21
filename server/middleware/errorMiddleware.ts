import { ErrorRequestHandler, Response } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res: Response) => {
    res.status(error.status || 500).json({
        error: {
            status: error?.status || 500,
            message: error?.message,
        },
    });
};

export { errorMiddleware }
