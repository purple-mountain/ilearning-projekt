import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res) => {
    console.log(`err123 ${error}`)
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message,
        },
    });
};

export { errorMiddleware }
